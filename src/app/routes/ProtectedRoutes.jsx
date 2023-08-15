import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Navbar from '../components/Nav/Navbar'

const ProtectedRoutes = () => {
  const token = useSelector(state => state.auth.token)

  if (!token) return <Navigate to='/login' />

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default ProtectedRoutes
