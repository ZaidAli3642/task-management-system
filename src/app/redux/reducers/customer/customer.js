import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  customersData: [],
  customerAddModal: false,
  customerDeleteModal: false,
  customerEditModal: false,
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
  },
})

export default customersSlice.reducer
export const { customerAddModal, customerDeleteModal, customerEditModal } = customersSlice.actions
