import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  employeeDataFetch: false,
  employeeData: [],
  activeEmployees: [],
  customersAssignedTask: {},
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
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        todayTasks: 0,
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
      state.employeeDataFetch = true
      state.error = null
    },
    employeesDataSet: (state, action) => {
      state.employeeData = action.payload
      state.employeeDataFetch = false
      state.error = null
    },
    employeeFetchFailed: (state, action) => {
      state.employeeDataFetch = false
      state.error = action.payload.error
    },
    activeEmployeeFetch: (state, action) => {
      state.loading = true
      state.error = null
    },
    activeEmployeeFetchSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.activeEmployees = action.payload
    },
    activeEmployeeFetchFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    fetchCustomersAssignedTask: (state, action) => {
      state.loading = true
      state.error = null
    },
    fetchCustomersAssignedTaskSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.customersAssignedTask = action.payload
    },
    fetchCustomersAssignedTaskFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export default employeesSlice.reducer
export const { fetchCustomersAssignedTask, fetchCustomersAssignedTaskFailed, fetchCustomersAssignedTaskSuccess, activeEmployeeFetch, activeEmployeeFetchFailed, activeEmployeeFetchSuccess, employeeAddModal, employeeDeleteModal, employeeEditModal, employeeAdd, employeeAddFailed, employeeAddSuccess, employeeDelete, employeeDeleteFailed, employeeDeleteSuccess, employeeEdit, employeeEditFailed, employeeEditSuccess, employeeFetch, employeesDataSet, employeeFetchFailed } = employeesSlice.actions
