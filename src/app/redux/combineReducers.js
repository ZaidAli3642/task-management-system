import { combineReducers } from 'redux'

import auth from './reducers/auth/auth'
import employees from './reducers/employee/employees'
import customers from './reducers/customer/customer'
import taskGroup from './reducers/taskGroup/taskGroup'
import employeeCustomer from './reducers/employeeCustomer/employeeCustomer'
import customerTaskManagement from './reducers/customerTaskManagement/customerTaskManagement'

export default combineReducers({
  auth,
  employees,
  customers,
  taskGroup,
  employeeCustomer,
  customerTaskManagement,
})
