import { Link } from 'react-router-dom'


const Sidebar = () => {
  return (
      <aside className='md:w-80 lg:w-96 px-5 py-10 bg-sky-600'>
        <Link
          to='/dashboard/crear-usuario'
        >Crear Usuario</Link>
      </aside>
  )
}

export default Sidebar