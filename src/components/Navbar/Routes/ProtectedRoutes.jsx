import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react'

function ProtectedRoutes() {
    const [isLogin,setisLogin] = useState(localStorage.getItem('login'))
    
     
  return (
    isLogin === 'true' ?  <Outlet/> : <Navigate to="/login" />
  )
}

export default ProtectedRoutes
