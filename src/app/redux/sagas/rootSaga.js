import { all } from 'redux-saga/effects'
import { authSaga } from './auth'
import { employeeSaga } from './employee'

export function* rootSaga() {
  yield all([authSaga(), employeeSaga()])
}
