import { call, put, select, takeEvery } from 'redux-saga/effects'
import { addTaskGroup, addTaskGroupError, addTaskGroupSuccess, deleteTaskGroup, deleteTaskGroupError, deleteTaskGroupSuccess, fetchTaskGroup, fetchTaskGroupError, fetchTaskGroupSuccess, taskGroupAddModal, editTaskGroup as editTaskGroupAction, editTaskGroupSuccess, editTaskGroupError, taskEditModal } from '../reducers/taskGroup/taskGroup'
import { taskGroup } from '../../api/taskGroup/taskGroup'
import _ from 'lodash'

function* getTaskGroup(action) {
  const token = yield select(state => state.auth.token)
  const { perPage, page } = action.payload
  try {
    const response = yield call(taskGroup(token).fetchTaskGroups, perPage, page)
    const sortedData = _.orderBy(response.data.taskGroups, ['name'], 'asc')
    yield put(fetchTaskGroupSuccess(sortedData))
  } catch (error) {
    yield put(fetchTaskGroupError({ error }))
  }
}

function* createTaskGroup(action) {
  const token = yield select(state => state.auth.token)

  try {
    const response = yield call(taskGroup(token).addTaskGroups, action.payload.taskGroup)
    yield put(addTaskGroupSuccess({ taskGroup: response.data.data }))
    yield put(taskGroupAddModal(false))
  } catch (error) {
    const errors = error?.response?.data?.errors
    yield put(taskGroupAddModal(false))
    if (errors) {
      action.payload.toast({
        title: 'Task group failed',
        description: errors.name[0],
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      yield put(addTaskGroupError({ error }))
    }
  }
}

function* removeTaskGroup(action) {
  const token = yield select(state => state.auth.token)

  try {
    const response = yield call(taskGroup(token).deleteTaskGroups, action.payload.taskGroupId)
    yield put(deleteTaskGroupSuccess())
  } catch (error) {
    yield put(deleteTaskGroupError({ error }))
  }
}

function* editTaskGroup(action) {
  const token = yield select(state => state.auth.token)
  const { updatedTaskGroup, taskGroupId, toast } = action.payload
  try {
    const response = yield call(taskGroup(token).editTaskGroups, updatedTaskGroup, taskGroupId)
    yield put(editTaskGroupSuccess({ updatedTaskGroup, taskGroupId }))
  } catch (error) {
    const errors = error?.response?.data?.errors
    if (errors) {
      action.payload.toast({
        title: 'Task group failed',
        description: errors.name[0],
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      yield put(editTaskGroupError({ error }))
    }
  }
}

export function* taskGroupSaga() {
  yield takeEvery(fetchTaskGroup.type, getTaskGroup)
  yield takeEvery(addTaskGroup.type, createTaskGroup)
  yield takeEvery(deleteTaskGroup.type, removeTaskGroup)
  yield takeEvery(editTaskGroupAction.type, editTaskGroup)
}
