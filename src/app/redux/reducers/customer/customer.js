import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  customersDataFetch: false,
  customersData: [],
  activeCustomers: [],
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
      state.customersDataFetch = true
      state.error = null
    },
    customerFetchSuccess: (state, action) => {
      state.customersDataFetch = false
      state.customersData = action.payload
      state.error = null
    },
    customerFetchFailed: (state, action) => {
      state.customersDataFetch = false
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
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        todayTasks: 0,
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
    getActiveCustomers: (state, action) => {
      state.loading = true
      state.error = null
    },
    getActiveCustomersSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.activeCustomers = action.payload
    },
    getActiveCustomersFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export default customersSlice.reducer
export const { getActiveCustomers, getActiveCustomersFailed, getActiveCustomersSuccess, customerAddModal, customerDeleteModal, customerEditModal, customerFetch, customerFetchFailed, customerFetchSuccess, customerAdd, customerAddFailed, customerAddSuccess, customerEdit, customerEditFailed, customerEditSucccess } = customersSlice.actions
