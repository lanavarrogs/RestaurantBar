import { Link } from 'react-router-dom'
import useMenu from '../hooks/useMenu'
import Swal from 'sweetalert2'

const ProductoVista = ({producto}) => {

  const { nombre,_id } = producto
  const { eliminarProducto } = useMenu()

  const hancdleSubmit = () => {
    
    Swal.fire({
      title: 'Estas seguro que deseas cancelar?',
      text: "Se borrara todo tu pedido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'El usuario ha sido borrado con exito.',
          'success'
        )
        eliminarProducto(_id)
      }
    })


  }


  return (
    <div className="border-b p-5 flex justify-between	">
        <div>
            <p>{nombre}</p>
        </div>
        <div className='flex '>
          <div className='flex mx-5'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            <Link
              to={_id}
            >Editar</Link>
            </div>
            <div className='flex mx-5'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
            <button
              onClick={() => hancdleSubmit()}
            >Eliminar</button>
            </div>
        </div>
    </div>
  )
}

export default ProductoVista