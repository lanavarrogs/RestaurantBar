import { useEffect,useState } from "react"
import useUsuario from "../hooks/useUsuario"
import UsuarioVista from "../components/UsuarioVista"
import useSucursal from "../hooks/useSucursal"

const Usuarios = () => {

    const { usuarios } = useUsuario()
    const { sucursalSeleccionada } = useSucursal() 
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([{}])
    
    useEffect(() => {
      const filtrarUsuarios = () => {
        const data = usuarios.filter(usuario => usuario.sucursal === sucursalSeleccionada._id)
        setUsuariosFiltrados(data)
      }
      filtrarUsuarios()
    }, [])
    

  return (
    <>
        <h1 className="text-4xl font-black">Usuarios</h1>

        <div className="bg-white shadow mt-10 rounded-lg">
            {usuarios.length ? 
                usuariosFiltrados.map( (usuario,index) => (
                  <UsuarioVista
                    key={index}
                    usuario={usuario}
                  />
                ))
            : <p className="text-center text-gray-600 uppercase p-5">No hay usuarios</p>}
        </div>
    </>
  )
}

export default Usuarios