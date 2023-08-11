import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/Login/Login'
import Home from './pages/AdminEmployeeOverview/Home'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import UnProtectedRoutes from './components/ProtectedRoutes/UnProtectedRoutes'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route element={<UnProtectedRoutes />}>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path='/home' element={<Home />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
