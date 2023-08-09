import React, { useLayoutEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'


function ProtectedRoute() {

    let isLogin  =  localStorage.getItem('login')
   return  (
    isLogin != 'true' ?  <Navigate to='login'/> : <Outlet/>
  )
}

export default ProtectedRoute
