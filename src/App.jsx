import Login from './pages/Login/Login'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Login />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
