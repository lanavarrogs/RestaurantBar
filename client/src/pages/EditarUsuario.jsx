import { useEffect,useState } from "react"
import {useParams} from 'react-router-dom' 
import useUsuario from "../hooks/useUsuario"
import axios from "axios"
import Swal from "sweetalert2"
import Alerta from "../components/Alerta"

const EditarUsuario = () => {
  
  const [nombre, setNombre] = useState('')
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tipoUsuario, setTipoUsuario] = useState('')
  const [cargando, setCargando] = useState(true);

  const { usuario, obtenerUsuario } = useUsuario()
  const params = useParams()

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


  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      await obtenerUsuario(params.id)
      console.log(usuario)
      setNombre(usuario.nombre)
      setNombreUsuario(usuario.username)
      setTipoUsuario(usuario.role)
      setCargando(false);
    }
    obtenerDatosUsuario()
  },[params.id,cargando])

    if (cargando) {
    return <p>Cargando usuario...</p>;
  }


  const handleSubmit = async e => {
      e.preventDefault()
      if([nombre,nombreUsuario,tipoUsuario].includes('')){
        setAlerta({
          tipo: 'error',
          msg: 'Todos los campos son obligatorios'
        })
        return
      }
      setAlerta({})

      // Editar Usuario
      try{
        const token = localStorage.getItem('token');
        if(!token) return
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        
        
        const { data } = await axios.put(`http://localhost:3000/api/usuarios/editarUsuario/${params.id}`,{nombre,nombreUsuario,tipoUsuario},config);
        
         if(data.error){
          setAlerta({
              msg: data.msg,
              error: true
          })
          return
        }
        
         Toast.fire({
                icon:'success',
                title: data.msg
          })

      }catch(error){
        console.log(error)
      }
  }

  const message = alerta.msg

  return (
     <>
        <h1 className="text-4xl font-black">Crear Usuario</h1>
        <div className="mt-10 flex justify-center">
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
                  value="Editar Usuario"
                  className="bg-sky-600 w-full p-3 text-white uppercase font-bold hover:bg-sky-700 rounded cursor-pointer transition-colors"
              />
          </form>
        </div>
    </>
  )
}

export default EditarUsuario