import { Navigate, Outlet } from 'react-router-dom'

import Navbar from '../components/Nav/Navbar'

const ProtectedRoutes = () => {
  const auth = {
    token: true,
  }

  if (!auth.token) return <Navigate to='/login' />

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default ProtectedRoutes
