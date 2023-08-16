import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login/Login'
import UnProtectedRoutes from './routes/UnProtectedRoutes'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Employees from './pages/Employee/Employees'
import NotFound from './pages/404/NotFound'
import Customers from './pages/Customer/Customers'

const Root = () => {
  return (
    <Routes>
      <Route path='/' element={<UnProtectedRoutes />}>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path='/employees' element={<Employees />} />
        <Route path='/customer' element={<Customers/>}/>   
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Root
