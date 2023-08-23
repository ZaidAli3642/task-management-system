import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  customersData: [],
  customerAddModal: false,
  customerDeleteModal: false,
  customerEditModal: false,
  error: null,
}

const customersSlice = createSlice({
  name: 'customers',
  initialState: initialState,
  reducers: {
    customerAddModal: (state, action) => {
      state.customerAddModal = action.payload
    },
    customerEditModal: (state, action) => {
      state.customerEditModal = action.payload
    },
    customerDeleteModal: (state, action) => {
      state.customerDeleteModal = action.payload
    },
    customerFetch: (state, action) => {
      state.loading = true
    },
    customerFetchSuccess: (state, action) => {
      state.loading = false
      state.customersData = action.payload
      state.error = null
    },
    customerFetchFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    customerAdd: (state, action) => {
      state.loading = true
    },
    customerAddSuccess: (state, action) => {
      const { customer } = action.payload
      state.loading = false
      state.error = null

      const customerData = {
        ...customer,
        t1: 25,
        t2: 35,
        t3: 45,
        t4: 15,
        todayTasks: 45,
        unsolvedTasks: 0,
      }
      state.customersData.push(customerData)
    },
    customerAddFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    customerEdit: (state, action) => {
      const { updatedUser, userId } = action.payload
      state.loading = false
      const cusData = [...state.customersData]
      const index = state.customersData.findIndex(customer => customer.uuid === userId)
      cusData[index] = { ...cusData[index], name: updatedUser.name, description: updatedUser.description, code: updatedUser.code }

      state.customersData = cusData
    },
    customerEditFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    customerEditSucccess: (state, action) => {
      state.loading = false
      state.error = null
    },
  },
})

export default customersSlice.reducer
export const { customerAddModal, customerDeleteModal, customerEditModal, customerFetch, customerFetchFailed, customerFetchSuccess, customerAdd, customerAddFailed, customerAddSuccess, customerEdit, customerEditFailed, customerEditSucccess } = customersSlice.actions
