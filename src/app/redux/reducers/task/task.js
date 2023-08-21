import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  taskGroupsAndTasks: [],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    fetchTaskGroup: () => {},
  },
})

export default tasksSlice.reducer
export const {} = tasksSlice.actions
