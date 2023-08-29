import { call, put, select, takeEvery } from 'redux-saga/effects'
import { customerTaskManagement } from '../../api/customerTaskManagement/customerTaskManagement'
import { addResponsible, addResponsibleFailed, addResponsibleSuccess, fetchTaskGroupWithSchedules, fetchTaskGroupWithSchedulesFailed, fetchTaskGroupWithSchedulesSuccess, filters } from '../reducers/customerTaskManagement/customerTaskManagement'

function* getTaskGroupWithSchedules(action) {
  const token = yield select(state => state.auth.token)
  const { customerId, selectedTaskGroups, selectedTasks, selectedResponsibles } = action.payload
  try {
    const response = yield call(customerTaskManagement(token).fetchTaskGroupWithSchedules, customerId, selectedTaskGroups, selectedTasks, selectedResponsibles)
    yield put(fetchTaskGroupWithSchedulesSuccess(response.data))
    if (!selectedTaskGroups?.length && !selectedTasks?.length && !selectedResponsibles?.length) {
      yield put(filters(response.data))
    }
  } catch (error) {
    yield put(fetchTaskGroupWithSchedulesFailed({ error }))
  }
}

function* createResponsible(action) {
  const token = yield select(state => state.auth.token)
  const { data } = action.payload
  console.log('Data : ', data)
  try {
    const response = yield call(customerTaskManagement(token).addResponsible, data)
    yield put(addResponsibleSuccess({ data: response.data }))
  } catch (error) {
    yield put(addResponsibleFailed({ error }))
  }
}

export function* customerTaskManagementSaga() {
  yield takeEvery(fetchTaskGroupWithSchedules.type, getTaskGroupWithSchedules)
  yield takeEvery(addResponsible.type, createResponsible)
}
