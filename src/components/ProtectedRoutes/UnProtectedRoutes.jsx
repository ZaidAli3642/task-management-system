import React from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function UnProtectedRoutes() {
  let isAuthenticated = localStorage.getItem('isLogged')

  console.log(typeof isAuthenticated)

  return isAuthenticated === 'true' ? <Navigate to='/home' /> : <Outlet />
}
