import { call, put, select, takeEvery } from 'redux-saga/effects'
import { employeeTaskManagement } from '../../api/employeeTaskManagement/employeeTaskManagement'
import { fetchAllCustomers, fetchAllCustomersFailed, fetchAllCustomersSuccess, fetchAllEmployees, fetchAllEmployeesFailed, fetchAllEmployeesSuccess, fetchTaskForEmployees, fetchTaskForEmployeesAllCustomers, fetchTaskForEmployeesAllCustomersFailed, fetchTaskForEmployeesAllCustomersSuccess, fetchTaskForEmployeesFailed, fetchTaskForEmployeesSuccess, setFilters, setPageCount, setPerPage, updateTaskByEmployee, updateTaskByEmployeeFailed, updateTaskByEmployeeSuccess } from '../reducers/employeeTaskManagement/employeeTaskManagement'
import moment from 'moment'
import _ from 'lodash'
import { employeeCustomer } from '../../api/employeeCustomer/employeeCustomer'

const sortData = response => {
  const sortedData = _.map(response.data.customers, customerTask => {
    return {
      ...customerTask,
      currentTasks: _.sortBy(customerTask.currentTasks, ['week_no', 'week_day']),
      futureTasks: _.sortBy(customerTask.futureTasks, ['week_no', 'week_day']),
      pastTasks: _.sortBy(customerTask.pastTasks, ['week_no', 'week_day']),
    }
  })

  return sortedData
}

function* getAllEmplpyees(action) {
  const token = yield select(state => state.auth.token)
  try {
    const response = yield call(employeeTaskManagement(token).fetchAllEmployees)
    response.data.push({ id: null, first_name: 'Customer' })
    response.data.unshift({ id: 'all', first_name: 'All' })
    yield put(fetchAllEmployeesSuccess(response.data))
  } catch (error) {
    yield put(fetchAllEmployeesFailed({ error }))
  }
}
function* getAllCustomers(action) {
  const token = yield select(state => state.auth.token)
  const employeeId = action.payload.employeeId
  try {
    const response = yield call(employeeCustomer(token).fetchEmployeeCustomer, employeeId)
    response.data.data.unshift({ id: null, name: 'All' })
    yield put(fetchAllCustomersSuccess(response.data.data))
  } catch (error) {
    yield put(fetchAllCustomersFailed({ error }))
  }
}

function* getTaskForEmployees(action) {
  const token = yield select(state => state.auth.token)
  const { responsibleId, customerId, filters, setFilterChanged, filterChanged } = action.payload
  let { year, week, taskGroup, task, solvedUnsolved, weekNumber } = filters

  if (week.length > 1) {
    weekNumber = null
  } else {
    if (week[0] !== weekNumber) {
      weekNumber = null
    }
  }
  let status = solvedUnsolved.length === 0 ? null : solvedUnsolved[0] === 1 ? 'solved' : 'unsolved'
  try {
    const response = yield call(employeeTaskManagement(token).fetchTaskForEmployees, responsibleId, customerId, { taskGroup, task, week, year, solvedUnsolved: status, weekNumber })
    const sortedData = sortData(response)
    yield put(fetchTaskForEmployeesSuccess(sortedData))
    if (!filters.taskGroup.length && !filters.task.length && !filters.solvedUnsolved.length) {
      yield put(setFilters({ data: response.data.customers }))
    }

    setFilterChanged(!filterChanged)
  } catch (error) {
    yield put(fetchTaskForEmployeesFailed({ error }))
  }
}

function* getTaskForEmployeesAllCustomers(action) {
  const token = yield select(state => state.auth.token)
  const { responsibleId, filters, pageNo, setFilterChanged, filterChanged } = action.payload
  let { year, week, taskGroup, task, solvedUnsolved, weekNumber } = filters
  if (week.length > 1) {
    weekNumber = null
  } else {
    if (week[0] !== weekNumber) {
      weekNumber = null
    }
  }

  let status = solvedUnsolved.length === 0 ? null : solvedUnsolved[0] === 1 ? 'solved' : 'unsolved'
  try {
    const response = yield call(employeeTaskManagement(token).fetchTaskForEmployeesAllCustomers, responsibleId, { taskGroup, task, week, year, solvedUnsolved: status, weekNumber })
    const sortedData = sortData(response)

    yield put(fetchTaskForEmployeesAllCustomersSuccess(sortedData))
    yield put(setPageCount({ pageNo: pageNo }))
    if (!filters.taskGroup.length && !filters.task.length && !filters.solvedUnsolved.length) yield put(setFilters({ data: response.data.customers }))
    setFilterChanged(!filterChanged)
  } catch (error) {
    yield put(fetchTaskForEmployeesAllCustomersFailed({ error }))
  }
}

let isFetch = false

function* updateTask(action) {
  const token = yield select(state => state.auth.token)
  const { data, pageNo, isCustomerAll, responsibleId, customerId, filters, setFilterChanged, filterChanged, isPast } = action.payload

  let { year, week, taskGroup, task, solvedUnsolved, weekNumber } = filters
  let status = solvedUnsolved.length === 0 ? null : solvedUnsolved[0] === 1 ? 'solved' : 'unsolved'

  if (week.length > 1) {
    weekNumber = null
  } else {
    if (week[0] !== weekNumber) {
      weekNumber = null
    }
  }

  try {
    const response = yield call(employeeTaskManagement(token).updateTaskByEmployee, data)
    if (response) {
      if (isCustomerAll) {
        const response = yield call(employeeTaskManagement(token).fetchTaskForEmployeesAllCustomers, responsibleId, { year, week, taskGroup, task, solvedUnsolved: status, weekNumber })
        const sortedData = sortData(response)

        yield put(fetchTaskForEmployeesAllCustomersSuccess(sortedData))
        yield put(setPageCount({ pageNo: pageNo }))
      } else {
        const response = yield call(employeeTaskManagement(token).fetchTaskForEmployees, responsibleId, customerId, { year, week, taskGroup, task, solvedUnsolved: status, weekNumber })
        const sortedData = sortData(response)
        yield put(fetchTaskForEmployeesSuccess(sortedData))
      }
    }

    const debounce = _.debounce(() => {
      setFilterChanged(!filterChanged)
    }, 100)

    if (isPast || status === 'unsolved') debounce()

    yield put(updateTaskByEmployeeSuccess())
  } catch (error) {
    yield put(updateTaskByEmployeeFailed({ error }))
  }
}

export function* employeeTaskManagementSaga() {
  yield takeEvery(fetchAllEmployees.type, getAllEmplpyees)
  yield takeEvery(fetchAllCustomers.type, getAllCustomers)
  yield takeEvery(fetchTaskForEmployees.type, getTaskForEmployees)
  yield takeEvery(fetchTaskForEmployeesAllCustomers.type, getTaskForEmployeesAllCustomers)
  yield takeEvery(updateTaskByEmployee.type, updateTask)
}
