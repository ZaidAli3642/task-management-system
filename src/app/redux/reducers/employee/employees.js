import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  employeeData: [],
  employeeAddModal: false,
  employeeDeleteModal: false,
  employeeEditModal: false,
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
  },
})

export default employeesSlice.reducer
export const { employeeAddModal, employeeDeleteModal, employeeEditModal } = employeesSlice.actions
