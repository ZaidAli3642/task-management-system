import { combineReducers } from 'redux'

import auth from './reducers/auth/auth'
import employees from './reducers/employee/employees'
import customers from './reducers/customer/customer'

export default combineReducers({
  auth,
  employees,
  customers,
})
