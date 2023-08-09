import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/Login/Login'
import ProtectedRoutes from './routes/ProtectedRoutes'
import UnProtectedRoutes from './routes/UnProtectedRoutes'
import Employees from './pages/Employee/Employees'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route element={<UnProtectedRoutes />}>
            <Route path='/login' element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path='/employees' element={<Employees />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
