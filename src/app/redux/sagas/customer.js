import { call, put, select, takeEvery } from 'redux-saga/effects'
import { customers } from '../../api/customers/customers'
import { customerAdd, customerAddFailed, customerAddSuccess, customerEdit, customerEditFailed, customerFetch, customerFetchFailed, customerFetchSuccess } from '../reducers/customer/customer'

function* fetchCustomers(action) {
  const token = yield select(state => state.auth.token)
  const { perPage, page } = action.payload
  try {
    const response = yield call(customers(token).fetchCustomers, perPage, page)
    yield put(customerFetchSuccess(response.data.data))
  } catch (error) {
    yield put(customerFetchFailed({ error }))
  }
}

function* addCustomers(action) {
  const token = yield select(state => state.auth.token)
  try {
    const response = yield call(customers(token).addCustomer, action.payload.customerCredentials)
    yield put(customerAddSuccess({ customer: response.data.data }))
  } catch (error) {
    yield put(customerAddFailed({ error }))
  }
}

function* editCustomers(action) {
  const token = yield select(state => state.auth.token)
  const { updatedUser, userId } = action.payload
  try {
    yield call(customers(token).editCustomer, updatedUser, userId)
  } catch (error) {
    yield put(customerEditFailed({ error }))
  }
}

export function* customersSaga() {
  yield takeEvery(customerFetch.type, fetchCustomers)
  yield takeEvery(customerAdd.type, addCustomers)
  yield takeEvery(customerEdit.type, editCustomers)
}
