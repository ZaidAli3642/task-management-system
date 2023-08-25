import { call, put, select, takeEvery } from 'redux-saga/effects'
import { employeeAdd, employeeAddFailed, employeeAddSuccess, employeeDelete, employeeDeleteFailed, employeeEdit, employeeEditFailed, employeeFetch, employeeFetchFailed, employeesDataSet } from '../reducers/employee/employees'
import { users } from '../../api/users/users'
import _ from 'lodash'

function* fetchEmplpyee(action) {
  const token = yield select(state => state.auth.token)
  const { perPage, page } = action.payload
  try {
    const response = yield call(users(token).fetchUsers, perPage, page)
    const employeeData = _.orderBy(response.data.data, ['first_name'], 'asc')
    yield put(employeesDataSet(employeeData))
  } catch (error) {
    yield put(employeeFetchFailed({ error }))
  }
}

function* addEmplpyee(action) {
  const { username, firstname, lastname, password } = action.payload.userCredentials
  try {
    const user = {
      first_name: firstname.charAt(0).toUpperCase() + firstname.slice(1),
      last_name: lastname.charAt(0).toUpperCase() + lastname.slice(1),
      username,
      password,
    }
    const response = yield call(users().addEmployee, user)
    yield put(employeeAddSuccess({ employee: response.data.data }))
  } catch (error) {
    const errors = error?.response?.data?.errors

    if (errors) {
      action.payload.toast({
        title: 'Employee add failed',
        description: errors?.username?.[0] || errors?.password?.[0],
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      yield put(employeeAddFailed({ error }))
    }
  }
}

function* deleteEmplpyee(action) {
  const token = yield select(state => state.auth.token)
  const userId = action.payload.userId
  try {
    const response = yield call(users(token).deleteEmployee, userId)
  } catch (error) {
    yield put(employeeDeleteFailed({ error }))
  }
}

function* editEmplpyee(action) {
  const token = yield select(state => state.auth.token)
  const userId = action.payload.userId
  const { firstname, lastname, username, password } = action.payload.updatedUser
  const updatedData = { first_name: firstname, last_name: lastname, username }

  if (password) updatedData.password = password

  try {
    const response = yield call(users(token).editEmployee, updatedData, userId)
    console.log('response : ', response)
  } catch (error) {
    console.log('Error : ', error)
    const errors = error?.response?.data?.errors

    if (errors) {
      action.payload.toast({
        title: 'Employee Edit failed',
        description: errors?.username?.[0] || errors?.password?.[0],
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      yield put(employeeEditFailed({ error }))
    }
  }
}

export function* employeeSaga() {
  yield takeEvery(employeeAdd.type, addEmplpyee)
  yield takeEvery(employeeDelete.type, deleteEmplpyee)
  yield takeEvery(employeeEdit.type, editEmplpyee)
  yield takeEvery(employeeFetch.type, fetchEmplpyee)
}
