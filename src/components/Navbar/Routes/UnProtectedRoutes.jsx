import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function UnProtectedRoutes() {
    let isAut = localStorage.getItem('login')
  return (
      isAut === 'true' ? <Navigate to='/admin' /> : <Outlet/>
  )
}

export default UnProtectedRoutes
