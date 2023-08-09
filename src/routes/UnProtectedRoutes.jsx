import { Navigate, Outlet } from 'react-router-dom'

const UnProtectedRoutes = () => {
  const auth = {
    token: true,
  }

  return auth.token ? <Navigate to='/employees' /> : <Outlet />
}

export default UnProtectedRoutes
