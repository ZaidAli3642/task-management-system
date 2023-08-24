import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  taskGroupsAndTasks: [],
  taskGroupAddModal: false,
  taskGroupEditModal: false,
  taskGroupDeleteModal: false,
  error: null,
}

const taskSlice = createSlice({
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
  },
})

export default taskSlice.reducer
export const {} = taskSlice.actions
