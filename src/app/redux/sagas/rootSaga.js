import { all } from 'redux-saga/effects'
import { authSaga } from './auth'
import { employeeSaga } from './employee'
import { customersSaga } from './customer'
import { taskGroupSaga } from './taskGroup'

export function* rootSaga() {
  yield all([authSaga(), employeeSaga(), customersSaga(), taskGroupSaga()])
}
