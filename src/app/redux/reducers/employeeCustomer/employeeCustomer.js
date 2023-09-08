import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  employeeCustomerData: [],
  employeeCustomerDataFetch: false,
  error: null,
}

const employeeCustomerSlice = createSlice({
  name: 'employeeCustomer',
  initialState: initialState,
  reducers: {
    employeeCustomerFetch: (state, action) => {
      state.employeeCustomerDataFetch = true
      state.error = null
    },
    employeeCustomerFetchFailed: (state, action) => {
      state.employeeCustomerDataFetch = false
      state.error = action.payload.error
    },
    employeeCustomerFetchSuccess: (state, action) => {
      state.employeeCustomerDataFetch = false
      state.error = null
      state.employeeCustomerData = action.payload
    },
  },
})

export default employeeCustomerSlice.reducer
export const { employeeCustomerFetch, employeeCustomerFetchFailed, employeeCustomerFetchSuccess } = employeeCustomerSlice.actions
