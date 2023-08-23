import { all } from 'redux-saga/effects'
import { authSaga } from './auth'
import { employeeSaga } from './employee'
import { customersSaga } from './customer'

export function* rootSaga() {
  yield all([authSaga(), employeeSaga(), customersSaga()])
}
