import { call, put, select, takeEvery } from 'redux-saga/effects'
import { employeeCustomerFetch, employeeCustomerFetchFailed, employeeCustomerFetchSuccess } from '../reducers/employeeCustomer/employeeCustomer'
import { employeeCustomer } from '../../api/employeeCustomer/employeeCustomer'

function* fetchEmplpyeeCustomer(action) {
  const token = yield select(state => state.auth.token)
  const { perPage, page, employeeId } = action.payload
  try {
    const response = yield call(employeeCustomer(token).fetchEmployeeCustomer, employeeId)
    yield put(employeeCustomerFetchSuccess(response.data.data))
  } catch (error) {
    yield put(employeeCustomerFetchFailed({ error }))
  }
}

export function* employeeCustomerSaga() {
  yield takeEvery(employeeCustomerFetch.type, fetchEmplpyeeCustomer)
}
