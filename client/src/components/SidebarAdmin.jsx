import { Link } from 'react-router-dom'


const SidebarAdmin = () => {
  return (
      <aside className='md:w-80 lg:w-96 px-5 py-10 bg-sky-600'>
        <Link
          className='text-white text-2xl font-black mb-5 block'
          to='/dashboard/admin'
        >Mostrar Informacion</Link>
      </aside>
  )
}

export default SidebarAdmin