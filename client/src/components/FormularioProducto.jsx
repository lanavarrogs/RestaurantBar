import { useState } from "react"
import Alerta from "./Alerta"
import Swal from 'sweetalert2'
import axios from 'axios'


const FormularioProducto = () => {

  const [nombre,setNombre] = useState('')
  const [precio,setPrecio] = useState(0)
  const [alerta, setAlerta] = useState({})
  const [tipo , setTipo] = useState('')
  const [imagen,setImagen] = useState('')
  const [descripcion,setDescripcion] = useState('')

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
    
    if([nombre,precio,tipo,imagen,descripcion].includes('')){
        setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
        })
        return
    }    

    setAlerta({})

    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.post('http://localhost:3000/api/menu/agregarProducto',{nombre,precio,tipo,imagen,descripcion},config)
        if(data.error){
                setAlerta({
                    msg: data.msg,
                    error: true,
                })
                return
            }
        setNombre('')
        setPrecio('')
        setTipo('')
        setImagen('')
        setDescripcion('')
        
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
                placeholder="Nombre Platillo; Ej. Pizza de Pepperoni"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label
                className="text-gray-700 text-sm uppercase font-bold "
                htmlFor="precio"
            >Precio</label>
            <input
                id="precio"
                type="text"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Nombre de Usuario"
                value={precio}
                onChange={e => setPrecio(Number(e.target.value))}
            />
        </div>
        <div className="mb-5">
            <label
                className="text-gray-700 text-sm uppercase font-bold "
                htmlFor="tipo"
            >Tipo de Platillo</label>
            <select
                id="tipo"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={tipo}
                onChange={e => setTipo(e.target.value)}
            >
                <option value="">Seleccionar</option>
                <option value="platillo">Platillo</option>
                <option value="bebida">Bebida</option>
            
            </select>
        </div>
        <div className="mb-5">
            <label
                className="text-gray-700 text-sm uppercase font-bold "
                htmlFor="imagen"
            >Url Imagen</label>
            <input
                id="imagen"
                type="text"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="https://www.google.com/imagen.jpg"
                value={imagen}
                onChange={e => setImagen(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label
                className="text-gray-700 text-sm uppercase font-bold "
                htmlFor="descripcion"
            >Descripcion</label>
            <textarea
                id="descripcion"
                type="text"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Ingresa la descripcion del producto"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            />
        </div>
        <input
            type="submit"
            value="Agregar Producto"
            className="bg-sky-600 w-full p-3 text-white uppercase font-bold hover:bg-sky-700 rounded cursor-pointer transition-colors"
        />
    </form>

    )
}

export default FormularioProducto