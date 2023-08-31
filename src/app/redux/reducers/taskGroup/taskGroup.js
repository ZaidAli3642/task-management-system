import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  taskGroupsAndTasks: [],
  taskGroupAddModal: false,
  taskAddModal: false,
  taskGroupEditModal: false,
  taskEditModal: false,
  taskGroupDeleteModal: false,
  taskDeleteModal: false,
  error: null,
}

const taskGroupSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    taskGroupAddModal: (state, action) => {
      state.taskGroupAddModal = action.payload
    },
    taskAddModal: (state, action) => {
      state.taskAddModal = action.payload
    },
    taskGroupEditModal: (state, action) => {
      state.taskGroupEditModal = action.payload
    },
    taskEditModal: (state, action) => {
      state.taskEditModal = action.payload
    },
    taskGroupDeleteModal: (state, action) => {
      state.taskGroupDeleteModal = action.payload
    },
    taskDeleteModal: (state, action) => {
      state.taskDeleteModal = action.payload
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
    },
    editTaskGroupSuccess: (state, action) => {
      state.loading = false
      state.error = null
      const { taskGroupId, updatedTaskGroup } = action.payload
      const taskGroup = [...state.taskGroupsAndTasks]
      const index = state.taskGroupsAndTasks.findIndex(taskGroup => taskGroup.uuid === taskGroupId)
      taskGroup[index] = { ...taskGroup[index], name: updatedTaskGroup.name }

      state.taskGroupsAndTasks = taskGroup
    },
    editTaskGroupError: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    addTask: (state, action) => {
      state.loading = true
      state.error = null
    },
    addTaskSuccess: (state, action) => {
      state.loading = false
      state.error = null
      const { task } = action.payload
      const taskGroupsAndTasks = [...state.taskGroupsAndTasks]
      const index = state.taskGroupsAndTasks.findIndex(taskGroup => taskGroup.id === task.task_group_id)
      taskGroupsAndTasks[index] = { ...taskGroupsAndTasks[index], tasks: [...taskGroupsAndTasks[index].tasks, task] }

      state.taskGroupsAndTasks = taskGroupsAndTasks
    },
    addTaskError: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    deleteTask: (state, action) => {
      state.loading = true
      state.error = null
      const { task } = action.payload
      const taskGroupsAndTasks = [...state.taskGroupsAndTasks]
      const index = state.taskGroupsAndTasks.findIndex(taskGroup => taskGroup.id === task.task_group_id)
      taskGroupsAndTasks[index] = { ...taskGroupsAndTasks[index], tasks: taskGroupsAndTasks[index].tasks.filter(tasks => tasks.uuid !== task.uuid) }

      state.taskGroupsAndTasks = taskGroupsAndTasks
    },
    deleteTaskSuccess: (state, action) => {
      state.loading = false
      state.error = null
    },
    deleteTaskError: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    editTask: (state, action) => {
      state.loading = true
      state.error = null
    },
    editTaskSuccess: (state, action) => {
      state.loading = false
      state.error = null
      const { updatedTask } = action.payload
      const taskGroupsAndTasks = [...state.taskGroupsAndTasks]
      const index = state.taskGroupsAndTasks.findIndex(taskGroup => taskGroup.id === updatedTask.task_group_id)
      taskGroupsAndTasks[index] = { ...taskGroupsAndTasks[index], tasks: taskGroupsAndTasks[index].tasks.map(tasks => (tasks.uuid === updatedTask.uuid ? { ...updatedTask } : { ...tasks })) }

      state.taskGroupsAndTasks = taskGroupsAndTasks
    },
    editTaskError: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export default taskGroupSlice.reducer
export const { editTask, editTaskError, editTaskSuccess, deleteTask, deleteTaskError, deleteTaskSuccess, fetchTaskGroupSuccess, fetchTaskGroup, fetchTaskGroupError, taskGroupAddModal, taskGroupDeleteModal, taskGroupEditModal, addTaskGroup, addTaskGroupError, addTaskGroupSuccess, deleteTaskGroup, deleteTaskGroupError, deleteTaskGroupSuccess, editTaskGroup, editTaskGroupError, editTaskGroupSuccess, taskAddModal, taskDeleteModal, taskEditModal, addTask, addTaskError, addTaskSuccess } = taskGroupSlice.actions
