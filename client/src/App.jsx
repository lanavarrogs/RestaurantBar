import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import RutaProtegida from './layouts/RutaProtegida'


import { AuthProvider } from './context/AuthProvider'
import { MenuProvider } from './context/MenuProvider'
import { OrderProvider } from './context/OrdenProvider'

function App() {

  return (
  <BrowserRouter>
    <AuthProvider>
      <MenuProvider>
        <OrderProvider>
          <Routes>
            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
            </Route>
            <Route path="/dashboard" element={<RutaProtegida/>}>
            </Route>
          </Routes>
        </OrderProvider>
      </MenuProvider>
    </AuthProvider>
  </BrowserRouter>
  )
}

export default App
