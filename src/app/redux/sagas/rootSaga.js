import { all } from 'redux-saga/effects'
import { authSaga } from './auth'
import { employeeSaga } from './employee'
import { customersSaga } from './customer'
import { taskGroupSaga } from './taskGroup'
import { taskSaga } from './task'
import { employeeCustomerSaga } from './employeeCustomer'
import { customerTaskManagementSaga } from './customerTaskManagement'

export function* rootSaga() {
  yield all([authSaga(), employeeSaga(), customersSaga(), taskGroupSaga(), taskSaga(), employeeCustomerSaga(), customerTaskManagementSaga()])
}
