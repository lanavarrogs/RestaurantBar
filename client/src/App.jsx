import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import Login from './pages/Login'
import NuevoUsuario from './pages/NuevoUsuario'
import NuevoProducto from './pages/NuevoProducto'
import AdminTables from './pages/AdminTables'
import Usuarios from './pages/Usuarios'
import EditarUsuario from './pages/EditarUsuario'
import Productos from './pages/Productos'
import EditarProducto from './pages/EditarProducto'

import RutaProtegida from './layouts/RutaProtegida'
import AuthLayout from './layouts/AuthLayout'

import { AuthProvider } from './context/AuthProvider'
import { MenuProvider } from './context/MenuProvider'
import { OrderProvider } from './context/OrdenProvider'
import { ProductoProvider } from './context/ProductoProvider'
import { UsuarioProvider } from './context/UsuarioProvider'
import { SucursalProvider } from './context/SucursalProvider'

function App() {

  return (
  <BrowserRouter>
    <AuthProvider>
      <UsuarioProvider>
        <SucursalProvider>
            <ProductoProvider>
              <MenuProvider>
                <OrderProvider>
                  <Routes>
                    <Route path='/' element={<AuthLayout/>}>
                      <Route index element={<Login/>}/>
                    </Route>
                    <Route path="/dashboard" element={<RutaProtegida/>}>
                      <Route path="admin" element={<AdminTables/>}/>
                      <Route path="crear-usuario" element={<NuevoUsuario/>}/>
                      <Route path="crear-producto" element={<NuevoProducto/>}/>
                      <Route path='usuarios' element={<Usuarios/>}/>
                      <Route path='usuarios/:id' element={<EditarUsuario/>}/>
                      <Route path='productos' element={<Productos/>} />
                      <Route path='productos/:id' element={<EditarProducto/>}/>
                    </Route>
                  </Routes>
                </OrderProvider>
              </MenuProvider>
            </ProductoProvider>
          </SucursalProvider>
      </UsuarioProvider>
    </AuthProvider>
  </BrowserRouter>
  )
}

export default App
