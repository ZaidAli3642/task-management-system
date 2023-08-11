import React from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet} from 'react-router-dom'

export default function UnProtectedRoutes() {
  let isAuthenticated = localStorage.getItem('isLogged')

  console.log(typeof isAuthenticated)

  return isAuthenticated === 'true' ? <Navigate to='/home' /> : <Outlet />
}








// import React, { useState, useEffect } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// export default function UnProtectedRoutes() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const storedAuthStatus = localStorage.getItem('isLogged');
//     setIsAuthenticated(storedAuthStatus === 'true');
//   }, []);

//   return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
// }
