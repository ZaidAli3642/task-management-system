import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminOverviewPage from './pages/AdminOverviewPage/AdminOverviewPage'
import Login from './pages/Login/Login'
import ProtectedRoutes from './components/Navbar/Routes/ProtectedRoutes'
import UnProtectedRoutes from './components/Navbar/Routes/UnProtectedRoutes'
import Customer from './pages/Login/Customer/Customer'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path='/' element={<UnProtectedRoutes />}>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route exact path='/admin' element={<AdminOverviewPage />} />
            <Route exact path='/customer' element={<Customer/>} />
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
