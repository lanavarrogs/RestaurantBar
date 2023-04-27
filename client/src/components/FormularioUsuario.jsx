import { useState } from "react"
import Alerta from "./Alerta"
import Swal from 'sweetalert2'
import axios from "axios"

import useUsuario from "../hooks/useUsuario"
import useSucursal from "../hooks/useSucursal"


const FormularioUsuario = () => {

    const [nombre, setNombre] = useState('')
    const [nombreUsuario, setNombreUsuario] = useState('')
    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState('')
    const [confirmarPassword, setConfirmarPassword] = useState('')
    const [tipoUsuario, setTipoUsuario] = useState('')


    const { nuevoUsuario } = useUsuario()
    const { sucursalSeleccionada } = useSucursal()

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })



    const handleSubmit = async e => {
        e.preventDefault()
        
        if([nombre, nombreUsuario, password, confirmarPassword,tipoUsuario].includes(' ')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
           
            return
        }

        if(password !== confirmarPassword){
            setAlerta({
                msg: 'Las contraseñas no coinciden',
                error: true
            })
            return
        }

        if(password.length < 8){
            setAlerta({
                msg: 'El password debe tener al menos 8 caracteres',
                error: true
            })
            return;
        }

        setAlerta({})

        try {
            const token = localStorage.getItem('token');
            const role = tipoUsuario
            const username = nombreUsuario
            const usuario = {
                nombre,
                username,
                password,
                role,
                sucursal: sucursalSeleccionada._id
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            } 
            const { data } = await axios.post('http://localhost:3000/api/usuarios/crearUsuario',usuario,config);
            
            if(data.error){
                setAlerta({
                    msg: data.msg,
                    error: true
                })
                return
            }
            
            setNombre('')
            setNombreUsuario('')
            setPassword('')
            setConfirmarPassword('')
            setTipoUsuario('')

            
           
            Toast.fire({
                icon:'success',
                title: data.msg
            })


        } catch (error) {
            console.log(error)
        }

        
        
    }


  const message = alerta.msg 

  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
        onSubmit={handleSubmit}
    > 
      <div className="mb-5">
        {message  && <Alerta alerta={alerta}/>}
      </div>

        <div className="mb-5">
            <label
                className="text-gray-700 text-sm uppercase font-bold "
                htmlFor="nombre"
            >Nombre</label>
            <input
                id="nombre"
                type="text"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Nombre y Apellido; Ej. Juan Perez"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label
                className="text-gray-700 text-sm uppercase font-bold "
                htmlFor="nombre-usuario"
            >Nombre de usuario</label>
            <input
                id="nombre-usuario"
                type="text"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Nombre de Usuario"
                value={nombreUsuario}
                onChange={e => setNombreUsuario(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label
                className="text-gray-700 text-sm uppercase font-bold "
                htmlFor="password"
            >Ingresa una contraseña</label>
            <input
                id="password"
                type="password"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label
                className="text-gray-700 text-sm uppercase font-bold "
                htmlFor="confirmar-password"
            >Confirma la contraseña</label>
            <input
                id="confirmar-password"
                type="password"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Confirmar Contraseña"
                value={confirmarPassword}
                onChange={e => setConfirmarPassword(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label
                className="text-gray-700 text-sm uppercase font-bold "
                htmlFor="tipo-usuario"
            >Tipo de Usuario</label>
            <select
                id="tipo-usuario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={tipoUsuario}
                onChange={e => setTipoUsuario(e.target.value)}
            >
                <option value="">Seleccionar</option>
                <option value="gerente">Gerente</option>
                <option value="user">Usuario</option>
            
            </select>
        </div>
        <input
            type="submit"
            value="Crear Usuario"
            className="bg-sky-600 w-full p-3 text-white uppercase font-bold hover:bg-sky-700 rounded cursor-pointer transition-colors"
        />
    </form>
  )
}

export default FormularioUsuario