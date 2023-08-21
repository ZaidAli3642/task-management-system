import { call, put, takeEvery } from 'redux-saga/effects'
import { login, failed, success } from '../reducers/auth/auth'
import { auth } from '../../api/auth/auth'

function* loginUser(action) {
  try {
    const response = yield call(auth().login, action.payload.inputFields)
    const { data, token } = response.data

    yield put(success({ token: token, userInfo: data }))
    action.payload.toast({
      title: 'Congrats!!!',
      description: 'You are logged in.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  } catch (error) {
    yield put(failed({ error: error.message }))

    action.payload.toast({
      title: 'Auth failed',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }
}

export function* authSaga() {
  yield takeEvery(login.type, loginUser)
}
