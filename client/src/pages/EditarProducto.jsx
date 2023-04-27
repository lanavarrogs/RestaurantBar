import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import useMenu from '../hooks/useMenu'
import Swal from 'sweetalert2'
import axios from 'axios'


const EditarProducto = () => {

    const [nombre,setNombre] = useState('')
    const [precio,setPrecio] = useState(0)
    const [alerta, setAlerta] = useState({})
    const [tipo , setTipo] = useState('')
    const [imagen,setImagen] = useState('')
    const [descripcion,setDescripcion] = useState('')
    const [cargando, setCargando] = useState(true);

    const params = useParams()
    const { producto, obtenerProducto } = useMenu()

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
    const obtenerDatosProducto = async () => {
      await obtenerProducto(params.id)
      setNombre(producto.nombre)
      setPrecio(producto.precio)
      setTipo(producto.tipo)
      setDescripcion(producto.descripcion)
      setImagen(producto.imagen)
      setCargando(false);
    }
    obtenerDatosProducto()
  },[params.id,cargando])

    if (cargando) {
    return <p>Cargando usuario...</p>;
  }


    const handleSubmit = async e => {
        e.preventDefault()
        if([nombre,precio,tipo,imagen,descripcion].includes('')){
            setAlerta({
                tipo: 'error',
                msg: 'Todos los campos son obligatorios'
            })
            return
        }
        setAlerta({})

        try{

             const token = localStorage.getItem('token');
            if(!token) return
                const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.put(`http://localhost:3000/api/menu/editarProducto/${params.id}`,{nombre,precio,tipo,imagen,descripcion},config)

            Toast.fire({
                icon: 'success',
                title: data.msg
            })
        }catch(error){
            console.log(error)
        }

    }

    
    const message = alerta.msg

  return (
    <>
        <h1 className="text-4xl font-black">Agregar Producto</h1>
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
                        <option value="Platillo">Platillo</option>
                        <option value="Bebida">Bebida</option>
                    
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
                    value="Editar Producto"
                    className="bg-sky-600 w-full p-3 text-white uppercase font-bold hover:bg-sky-700 rounded cursor-pointer transition-colors"
                />
            </form>
        </div>
    </>
  
    )

}

export default EditarProducto