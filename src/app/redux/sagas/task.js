import { call, put, select, takeEvery } from 'redux-saga/effects'
import { task } from '../../api/task/task'
import { addTask, addTaskError, addTaskSuccess, deleteTask, deleteTaskError, deleteTaskSuccess, editTask, editTaskError, editTaskSuccess, taskAddModal, taskEditModal } from '../reducers/taskGroup/taskGroup'

function* createTask(action) {
  const token = yield select(state => state.auth.token)

  try {
    const response = yield call(task(token).addTask, action.payload.task)
    yield put(addTaskSuccess({ task: response.data.data }))
    yield put(taskAddModal(false))
  } catch (error) {
    const errors = error?.response?.data?.errors
    yield put(taskAddModal(false))
    if (errors) {
      action.payload.toast({
        title: 'Task failed',
        description: errors.name[0],
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      yield put(addTaskError({ error }))
    }
  }
}

function* removeTask(action) {
  const token = yield select(state => state.auth.token)

  try {
    const response = yield call(task(token).deleteTask, action.payload.taskId)
    yield put(deleteTaskSuccess())
  } catch (error) {
    yield put(deleteTaskError({ error }))
  }
}

function* modifyTask(action) {
  const token = yield select(state => state.auth.token)

  const { updatedTask, taskId } = action.payload

  try {
    const response = yield call(task(token).editTask, updatedTask, taskId)
    yield put(editTaskSuccess({ updatedTask: response.data.data }))
    yield put(taskEditModal(false))
  } catch (error) {
    yield put(editTaskError({ error }))
  }
}

export function* taskSaga() {
  yield takeEvery(addTask.type, createTask)
  yield takeEvery(deleteTask.type, removeTask)
  yield takeEvery(editTask.type, modifyTask)
}
