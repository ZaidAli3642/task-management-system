import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  employeeData: [],
  employeeAddModal: false,
  employeeDeleteModal: false,
  employeeEditModal: false,
  error: null,
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState: initialState,
  reducers: {
    employeeAddModal: (state, action) => {
      state.employeeAddModal = action.payload
    },
    employeeEditModal: (state, action) => {
      state.employeeEditModal = action.payload
    },
    employeeDeleteModal: (state, action) => {
      state.employeeDeleteModal = action.payload
    },
    employeeAdd: (state, action) => {
      state.loading = true
    },
    employeeDelete: (state, action) => {
      state.loading = true
      state.employeeData = state.employeeData.filter(employee => employee.uuid !== action.payload.userId)
    },
    employeeDeleteFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    employeeDeleteSuccess: (state, action) => {
      state.loading = false
      state.error = null
    },
    employeeAddFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    employeeAddSuccess: (state, action) => {
      const { employee } = action.payload
      state.loading = false
      state.error = null

      const employeeData = {
        ...employee,
        t1: 25,
        t2: 35,
        t3: 45,
        t4: 15,
        todayTasks: 45,
        unsolvedTasks: 0,
      }
      state.employeeData.unshift(employeeData)
    },
    employeeEdit: (state, action) => {
      const { updatedUser, userId } = action.payload
      state.loading = false
      const empData = [...state.employeeData]
      const index = state.employeeData.findIndex(employee => employee.uuid === userId)
      empData[index] = { ...empData[index], first_name: updatedUser.firstname, last_name: updatedUser.lastname, username: updatedUser.username }

      state.employeeData = empData
    },
    employeeEditFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    employeeEditSuccess: (state, action) => {
      state.loading = false
      state.error = null
    },
    employeeFetch: (state, action) => {
      state.loading = true
      state.error = null
    },
    employeesDataSet: (state, action) => {
      state.employeeData = action.payload
      state.loading = false
      state.error = null
    },
    employeeFetchFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export default employeesSlice.reducer
export const { employeeAddModal, employeeDeleteModal, employeeEditModal, employeeAdd, employeeAddFailed, employeeAddSuccess, employeeDelete, employeeDeleteFailed, employeeDeleteSuccess, employeeEdit, employeeEditFailed, employeeEditSuccess, employeeFetch, employeesDataSet, employeeFetchFailed } = employeesSlice.actions
