import { call, put, select, take, takeEvery } from 'redux-saga/effects'
import { customerTaskManagement } from '../../api/customerTaskManagement/customerTaskManagement'
import { addEditRemoveNote, addEditRemoveNoteFailed, addEditRemoveNoteSuccess, addNoteModal, clearSectionModal, addResponsible, addResponsibleFailed, addResponsibleModal, addResponsibleSuccess, allCustomerFilters, clearSection, editNoteModal, editResponsibleModal, fetchCustomersWithTaskGroup, fetchCustomersWithTaskGroupFailed, fetchCustomersWithTaskGroupSuccess, fetchTaskGroupWithSchedules, fetchTaskGroupWithSchedulesFailed, fetchTaskGroupWithSchedulesSuccess, filters, manageRepetition, manageRepetitionError, manageRepetitionSuccess, repeatModal, clearSectionSuccess, clearSectionFailed, bulkAssignFailed, bulkAssignSuccess, bulkAssignModal, bulkAssign, editRepeatModal, setPageCount } from '../reducers/customerTaskManagement/customerTaskManagement'

function* getTaskGroupWithSchedules(action) {
  const token = yield select(state => state.auth.token)
  const pageNo = yield select(state => state.customerTaskManagement.pageNo)

  const { customerId, selectedTaskGroups, selectedTasks, selectedResponsibles, isCustomerAll } = action.payload
  try {
    const response = yield call(customerTaskManagement(token).fetchTaskGroupWithSchedules, customerId, selectedTaskGroups, selectedTasks, selectedResponsibles)
    yield put(fetchTaskGroupWithSchedulesSuccess(response.data))
    yield put(setPageCount({ pageNo: pageNo, isCustomerAll }))

    if (!selectedTaskGroups?.length && !selectedTasks?.length && !selectedResponsibles?.length) {
      yield put(filters(response.data))
    }
  } catch (error) {
    yield put(fetchTaskGroupWithSchedulesFailed({ error }))
  }
}

function* getCustomersWithTaskGroups(action) {
  const token = yield select(state => state.auth.token)
  const pageNo = yield select(state => state.customerTaskManagement.pageNo)

  const { customerId, selectedTaskGroups, selectedTasks, selectedResponsibles, isCustomerAll } = action.payload
  try {
    const response = yield call(customerTaskManagement(token).fetchCustomersWithTaskGroup, customerId, selectedTaskGroups, selectedTasks, selectedResponsibles)
    yield put(fetchCustomersWithTaskGroupSuccess(response.data))
    yield put(setPageCount({ pageNo: pageNo, isCustomerAll }))
    if (!selectedTaskGroups?.length && !selectedTasks?.length && !selectedResponsibles?.length) {
      yield put(allCustomerFilters(response.data))
    }
  } catch (error) {
    yield put(fetchCustomersWithTaskGroupFailed({ error }))
  }
}

function* createResponsible(action) {
  const token = yield select(state => state.auth.token)
  const pageNo = yield select(state => state.customerTaskManagement.pageNo)

  const { data, customerId, isCustomerAll } = action.payload
  try {
    const response = yield call(customerTaskManagement(token).addResponsible, data)
    if (response) {
      if (isCustomerAll) {
        const response = yield call(customerTaskManagement(token).fetchCustomersWithTaskGroup, customerId)
        yield put(fetchCustomersWithTaskGroupSuccess(response.data))
        yield put(setPageCount({ pageNo: pageNo, isCustomerAll }))
      } else {
        const response = yield call(customerTaskManagement(token).fetchTaskGroupWithSchedules, customerId)
        yield put(fetchTaskGroupWithSchedulesSuccess(response.data))
        yield put(setPageCount({ pageNo: pageNo, isCustomerAll }))
      }
    }
    yield put(addResponsibleModal(false))
    yield put(editResponsibleModal(false))
    yield put(addResponsibleSuccess({ data: response.data }))
  } catch (error) {
    yield put(addResponsibleFailed({ error }))
  }
}

function* manageNotes(action) {
  const token = yield select(state => state.auth.token)
  const pageNo = yield select(state => state.customerTaskManagement.pageNo)
  const { data, customerId, isCustomerAll } = action.payload
  try {
    const response = yield call(customerTaskManagement(token).addEditRemoveNote, data)
    if (response) {
      if (isCustomerAll) {
        const response = yield call(customerTaskManagement(token).fetchCustomersWithTaskGroup, customerId)
        yield put(fetchCustomersWithTaskGroupSuccess(response.data))
        yield put(setPageCount({ pageNo: pageNo, isCustomerAll }))
      } else {
        const response = yield call(customerTaskManagement(token).fetchTaskGroupWithSchedules, customerId)
        yield put(fetchTaskGroupWithSchedulesSuccess(response.data))
        yield put(setPageCount({ pageNo: pageNo, isCustomerAll }))
      }
    }
    yield put(addNoteModal(false))
    yield put(editNoteModal(false))
    yield put(addEditRemoveNoteSuccess({ data: response.data }))
  } catch (error) {
    yield put(addEditRemoveNoteFailed({ error }))
  }
}

function* manageRepetitionFunc(action) {
  const token = yield select(state => state.auth.token)
  const pageNo = yield select(state => state.customerTaskManagement.pageNo)

  const { data, customerId, isCustomerAll, setInputFieldsWeekly, setInputFieldsMonthly, setInputFieldsYearly, setRepetitionWeeklyDays } = action.payload
  try {
    const response = yield call(customerTaskManagement(token).manageRepetition, data)
    if (response) {
      if (isCustomerAll) {
        const response = yield call(customerTaskManagement(token).fetchCustomersWithTaskGroup, customerId)
        yield put(fetchCustomersWithTaskGroupSuccess(response.data))
        yield put(setPageCount({ pageNo: pageNo, isCustomerAll }))
      } else {
        const response = yield call(customerTaskManagement(token).fetchTaskGroupWithSchedules, customerId)
        yield put(fetchTaskGroupWithSchedulesSuccess(response.data))
        yield put(setPageCount({ pageNo: pageNo, isCustomerAll }))
      }
    }

    yield put(editRepeatModal(false))
    yield put(repeatModal(false))
    setInputFieldsWeekly && setInputFieldsWeekly({ repetitionWeeklyNo: '1' })
    setInputFieldsMonthly && setInputFieldsMonthly({ repetitionMonthlyNo: '1', repetitionMonthlyWeekDay: { id: 1, day: 'Monday' }, repetitionMonthlyWeekNo: { id: 1, week: 'First' }, repetitionMonthlyDate: { id: 1, label: '1st' } })
    setInputFieldsYearly && setInputFieldsYearly({ repetitionYearlyWeekNo: { id: 1, week: 'First' }, repetitionYearlyMonth: { id: 1, month: 'January' }, repetitionYearlyMonthDate: { id: 1, label: '1st' }, repetitionYearlyDay: { id: 1, day: 'Monday' } })
    setRepetitionWeeklyDays && setRepetitionWeeklyDays([])
    yield put(manageRepetitionSuccess({ data: response.data }))
  } catch (error) {
    const errors = error?.response?.data?.errors

    if (errors) {
      action.payload.toast({
        title: 'Repetition failed',
        description: errors?.repetition_weekly_no?.[0],
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
    yield put(manageRepetitionError({ error }))
  }
}

function* clearSectionTasks(action) {
  const token = yield select(state => state.auth.token)
  const pageNo = yield select(state => state.customerTaskManagement.pageNo)

  const { data, customerId, isCustomerAll } = action.payload
  try {
    const response = yield call(customerTaskManagement(token).clearSection, data)
    if (response) {
      if (isCustomerAll) {
        const response = yield call(customerTaskManagement(token).fetchCustomersWithTaskGroup, customerId)
        yield put(fetchCustomersWithTaskGroupSuccess(response.data))
        yield put(setPageCount({ pageNo: pageNo, isCustomerAll }))
      } else {
        const response = yield call(customerTaskManagement(token).fetchTaskGroupWithSchedules, customerId)
        yield put(fetchTaskGroupWithSchedulesSuccess(response.data))
        yield put(setPageCount({ pageNo: pageNo, isCustomerAll }))
      }
    }
    yield put(clearSectionModal(false))
    yield put(clearSectionSuccess())
  } catch (error) {
    yield put(clearSectionFailed({ error }))
  }
}

function* bulkAssignFunc(action) {
  const token = yield select(state => state.auth.token)
  const pageNo = yield select(state => state.customerTaskManagement.pageNo)

  const { data, customerId, isCustomerAll, inputFieldsSet } = action.payload
  try {
    const response = yield call(customerTaskManagement(token).bulkAssign, data)
    if (response) {
      if (isCustomerAll) {
        const response = yield call(customerTaskManagement(token).fetchCustomersWithTaskGroup, customerId)
        yield put(fetchCustomersWithTaskGroupSuccess(response.data))
        yield put(setPageCount({ pageNo: pageNo, isCustomerAll }))
      } else {
        const response = yield call(customerTaskManagement(token).fetchTaskGroupWithSchedules, customerId)
        yield put(fetchTaskGroupWithSchedulesSuccess(response.data))
        yield put(setPageCount({ pageNo: pageNo, isCustomerAll }))
      }
    }

    yield put(bulkAssignSuccess())
    yield put(bulkAssignModal(false))
    inputFieldsSet.setInputFieldsNote({ note: '' })
    inputFieldsSet.setInputFieldsResponsible({ id: '', first_name: '' })
    inputFieldsSet.setRepetitionType('')
    inputFieldsSet.setResponsibleSelectedOption(null)
  } catch (error) {
    yield put(bulkAssignFailed({ error }))
  }
}

export function* customerTaskManagementSaga() {
  yield takeEvery(fetchTaskGroupWithSchedules.type, getTaskGroupWithSchedules)
  yield takeEvery(fetchCustomersWithTaskGroup.type, getCustomersWithTaskGroups)
  yield takeEvery(addResponsible.type, createResponsible)
  yield takeEvery(addEditRemoveNote.type, manageNotes)
  yield takeEvery(manageRepetition.type, manageRepetitionFunc)
  yield takeEvery(clearSection.type, clearSectionTasks)
  yield takeEvery(bulkAssign.type, bulkAssignFunc)
}
