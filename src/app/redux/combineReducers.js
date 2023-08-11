import { combineReducers } from 'redux'

import auth from './reducers/auth/auth'
import employees from './reducers/employee/employees'

export default combineReducers({
  auth,
  employees,
})
