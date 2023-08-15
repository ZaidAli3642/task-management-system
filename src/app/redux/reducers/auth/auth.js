import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  userInfo: {},
  token: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.loading = true
      state.error = null
    },
    logout: (state, action) => {
      state.token = null
      state.userInfo = {}
    },
    success: (state, action) => {
      state.error = null
      state.loading = false
      state.token = action.payload.token
      state.userInfo = action.payload.userInfo
    },
    failed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export default authSlice.reducer
export const { login, success, failed, logout } = authSlice.actions
