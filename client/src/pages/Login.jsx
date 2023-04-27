import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"
import useSucursal from "../hooks/useSucursal"

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alert ,setAlert] = useState({})  

  const { setAuth } = useAuth();
  const { sucursal, sucursalSeleccionada,setSucursalSeleccionada } = useSucursal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
   

    if([username,password,sucursalSeleccionada].includes('')){
      setAlert({msg:'Todos los campos son obligatorios',error:true})
      return
    }

     const {_id} = sucursal.find(sucursal => sucursal.nombre === sucursalSeleccionada)

     
    try{ 

      const { data } = await axios.post('http://localhost:3000/api/auth/signin',{username,password,_id})
      if(data.token){
        localStorage.setItem('token',data.token)
        localStorage.setItem('sucursal',sucursalSeleccionada)
        setAuth(data)
        window.location.reload()
      }

    }catch(error){
        setAlert({msg: "Usuario o contrasenia  incorrecto", error: true})
    }
    

  }
  
  const message = alert.msg 

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="max-w-lg w-full bg-white bg-opacity-25 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Iniciar sesión</h2>
            {message  && <Alerta alerta={alert}/>}
          <form
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label htmlFor="username" className="block text-white font-medium mb-2">Nombre de Usuario</label>
              <input 
                id="username" 
                type="text" 
                name="username"
                placeholder="Username"
                className="border border-gray-400 p-2 rounded w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
                />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-white font-medium mb-2">Contraseña</label>
              <input 
                id="password" 
                type="password" 
                name="password"
                placeholder="Password" 
                className="border border-gray-400 p-2 rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
                />
            </div>
            <div className="mb-6">
                <select
                  id="tipo-usuario"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={sucursalSeleccionada}
                  onChange={(e) => setSucursalSeleccionada(e.target.value)}
                >
                  <option value=" ">Seleccionar</option>
                  {
                    sucursal.map((sucursal) => (
                      <option 
                      key={sucursal._id}
                      value={sucursal.nombre}
                      >{sucursal.nombre}</option>
                    ))
                  }
              </select>
            </div>
            <div className="">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full">
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Login