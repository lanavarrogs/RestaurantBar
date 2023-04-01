import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import './App.css'


import { AuthProvider } from './context/AuthProvider'

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
