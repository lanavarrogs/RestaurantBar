import { useState, useEffect } from 'react';
import Tablas from '../components/Tablas';


const AdminTables = () => {
  
  const [sucursal, setSucursal] = useState([])

  useEffect(() => {},[sucursal])

  return (
    <>
        <Tablas/>
    </>
  )
}

export default AdminTables