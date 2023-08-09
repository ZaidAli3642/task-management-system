import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AdminOverviewPage from './pages/AdminOverviewPage/AdminOverviewPage'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login/Login'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route path='*' element={<Login />} />
          <Route element={<ProtectedRoute/>}>
            <Route
              exact path='/admin'
              element={<AdminOverviewPage />}
            />
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
