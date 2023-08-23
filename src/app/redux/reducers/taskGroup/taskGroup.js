import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  taskGroupsAndTasks: [],
  taskGroupAddModal: false,
  taskGroupEditModal: false,
  taskGroupDeleteModal: false,
  error: null,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    taskGroupAddModal: (state, action) => {
      state.taskGroupAddModal = action.payload
    },
    taskGroupEditModal: (state, action) => {
      state.taskGroupEditModal = action.payload
    },
    taskGroupDeleteModal: (state, action) => {
      state.taskGroupDeleteModal = action.payload
    },
    fetchTaskGroup: (state, action) => {
      state.loading = true
      state.error = null
    },
    fetchTaskGroupSuccess: (state, action) => {
      state.loading = false
      state.taskGroupsAndTasks = action.payload
    },
    fetchTaskGroupError: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    addTaskGroup: (state, action) => {
      state.loading = true
      state.error = null
    },
    addTaskGroupSuccess: (state, action) => {
      const { taskGroup } = action.payload
      state.loading = false
      state.error = null

      const data = {
        ...taskGroup,
        tasks: [],
      }

      state.taskGroupsAndTasks.push(data)
    },
    addTaskGroupError: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    deleteTaskGroup: (state, action) => {
      state.loading = true
      state.error = null
      state.taskGroupsAndTasks = state.taskGroupsAndTasks.filter(taskGroup => taskGroup.uuid !== action.payload.taskGroupId)
    },
    deleteTaskGroupSuccess: (state, action) => {
      state.loading = false
      state.error = null
    },
    deleteTaskGroupError: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    editTaskGroup: (state, action) => {
      state.loading = true
      state.error = null
      const { taskGroupId, updatedTaskGroup } = action.payload
      const taskGroup = [...state.taskGroupsAndTasks]
      const index = state.taskGroupsAndTasks.findIndex(taskGroup => taskGroup.uuid === taskGroupId)
      taskGroup[index] = { ...taskGroup[index], name: updatedTaskGroup.name }

      state.taskGroupsAndTasks = taskGroup
    },
    editTaskGroupSuccess: (state, action) => {
      state.loading = false
      state.error = null
    },
    editTaskGroupError: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export default tasksSlice.reducer
export const { fetchTaskGroupSuccess, fetchTaskGroup, fetchTaskGroupError, taskGroupAddModal, taskGroupDeleteModal, taskGroupEditModal, addTaskGroup, addTaskGroupError, addTaskGroupSuccess, deleteTaskGroup, deleteTaskGroupError, deleteTaskGroupSuccess, editTaskGroup, editTaskGroupError, editTaskGroupSuccess } = tasksSlice.actions
