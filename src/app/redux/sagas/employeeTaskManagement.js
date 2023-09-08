import { call, put, select, takeEvery } from 'redux-saga/effects'
import { employeeTaskManagement } from '../../api/employeeTaskManagement/employeeTaskManagement'
import { fetchAllCustomers, fetchAllCustomersFailed, fetchAllCustomersSuccess, fetchAllEmployees, fetchAllEmployeesFailed, fetchAllEmployeesSuccess, fetchTaskForEmployees, fetchTaskForEmployeesAllCustomers, fetchTaskForEmployeesAllCustomersFailed, fetchTaskForEmployeesAllCustomersSuccess, fetchTaskForEmployeesFailed, fetchTaskForEmployeesSuccess, setFilters, setPageCount, setPerPage, updateTaskByEmployee, updateTaskByEmployeeFailed, updateTaskByEmployeeSuccess } from '../reducers/employeeTaskManagement/employeeTaskManagement'

function* getAllEmplpyees(action) {
  const token = yield select(state => state.auth.token)
  try {
    const response = yield call(employeeTaskManagement(token).fetchAllEmployees)
    response.data.push({ id: null, first_name: 'customer' })
    yield put(fetchAllEmployeesSuccess(response.data))
  } catch (error) {
    yield put(fetchAllEmployeesFailed({ error }))
  }
}
function* getAllCustomers(action) {
  const token = yield select(state => state.auth.token)
  try {
    const response = yield call(employeeTaskManagement(token).fetchAllCustomers)
    response.data.unshift({ id: null, name: 'All' })
    yield put(fetchAllCustomersSuccess(response.data))
  } catch (error) {
    yield put(fetchAllCustomersFailed({ error }))
  }
}

function* getTaskForEmployees(action) {
  const token = yield select(state => state.auth.token)
  const { responsibleId, customerId, filters } = action.payload
  const { year, week, taskGroup, task, solvedUnsolved, weekNumber } = filters
  let status = solvedUnsolved.length === 0 ? null : solvedUnsolved[0] === 1 ? 'solved' : 'unsolved'
  try {
    const response = yield call(employeeTaskManagement(token).fetchTaskForEmployees, responsibleId, customerId, { taskGroup, task, week, year, solvedUnsolved: status, weekNumber })
    yield put(fetchTaskForEmployeesSuccess(response.data.customers))
    if (!filters.taskGroup.length && !filters.task.length && !filters.solvedUnsolved.length) {
      yield put(setFilters({ data: response.data.customers }))
    }
  } catch (error) {
    yield put(fetchTaskForEmployeesFailed({ error }))
  }
}

function* getTaskForEmployeesAllCustomers(action) {
  const token = yield select(state => state.auth.token)
  const { responsibleId, filters, pageNo } = action.payload
  const { year, week, taskGroup, task, solvedUnsolved, weekNumber } = filters
  let status = solvedUnsolved.length === 0 ? null : solvedUnsolved[0] === 1 ? 'solved' : 'unsolved'
  try {
    const response = yield call(employeeTaskManagement(token).fetchTaskForEmployeesAllCustomers, responsibleId, { taskGroup, task, week, year, solvedUnsolved: status, weekNumber })
    yield put(fetchTaskForEmployeesAllCustomersSuccess(response.data.customers))
    yield put(setPageCount({ pageNo: pageNo }))
    if (!filters.taskGroup.length && !filters.task.length && !filters.solvedUnsolved.length) yield put(setFilters({ data: response.data.customers }))
  } catch (error) {
    yield put(fetchTaskForEmployeesAllCustomersFailed({ error }))
  }
}

function* updateTask(action) {
  const token = yield select(state => state.auth.token)
  const { data, pageNo, isCustomerAll, responsibleId, customerId, filters } = action.payload

  const { year, week, taskGroup, task, solvedUnsolved, weekNumber } = filters
  let status = solvedUnsolved.length === 0 ? null : solvedUnsolved[0] === 1 ? 'solved' : 'unsolved'
  try {
    const response = yield call(employeeTaskManagement(token).updateTaskByEmployee, data)
    if (response) {
      if (isCustomerAll) {
        const response = yield call(employeeTaskManagement(token).fetchTaskForEmployeesAllCustomers, responsibleId, { year, week, taskGroup, task, solvedUnsolved: status, weekNumber })
        yield put(fetchTaskForEmployeesAllCustomersSuccess(response.data.customers))
        yield put(setPageCount({ pageNo: pageNo }))
      } else {
        const response = yield call(employeeTaskManagement(token).fetchTaskForEmployees, responsibleId, customerId, { year, week, taskGroup, task, solvedUnsolved: status, weekNumber })
        yield put(fetchTaskForEmployeesSuccess(response.data.customers))
      }
    }

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
