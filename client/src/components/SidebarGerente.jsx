import { Link } from 'react-router-dom'

const SidebarGerente = () => {
  return (
    <aside className='md:w-80 lg:w-96 px-5 py-10 bg-sky-600'>
        <Link
          className='text-white text-2xl font-black mb-5 block'
          to='/dashboard/crear-producto'
        >Agregar Producto</Link>
        <Link
          className='text-white text-2xl font-black mb-5 block'
          to='/dashboard/crear-usuario'
        >Agregar Usuario</Link>
         <Link
          className='text-white text-2xl font-black mb-5 block'
          to='/dashboard/usuarios'
        >Usuarios</Link>
        <Link
          className='text-white text-2xl font-black mb-5 block'
          to='/dashboard/productos'
        >Productos</Link>
      </aside>
  )
}

export default SidebarGerente