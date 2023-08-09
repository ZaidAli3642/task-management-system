import { put, takeEvery } from 'redux-saga/effects'
import { login, failed, success } from '../reducers/auth'

function* loginUser() {
  try {
    yield put(success({ token: true, userInfo: true }))
  } catch (error) {
    yield put(failed({ error: error.message }))
  }
}

export function* authSaga() {
  yield takeEvery(login.type, loginUser)
}
