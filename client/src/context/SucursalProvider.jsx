import {useState, createContext, useEffect} from 'react';
import axios from 'axios';

const SucursalContext = createContext();

const SucursalProvider = ({children}) => {
    
    const [sucursal, setSucursal] = useState([])
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState({})

    useEffect(() => {
        const obtenerSucursal = async () => {
            try {
                const {data} = await axios.get('http://localhost:3000/api/sucursal/obtenerSucursal')
                setSucursal(data)
            } catch (error) {
                console.log(error)
            }
        } 
        obtenerSucursal()
    },[])


    useEffect(() => {
     
        const obtenerSucursalSeleccionada =  () => {
            const item = localStorage.getItem('sucursal')
            const value = sucursal.find(sucursal => sucursal.nombre === item )
            setSucursalSeleccionada(value)
        }
        obtenerSucursalSeleccionada()
    },[sucursal])

    return(
        <SucursalContext.Provider value={{
            sucursal,
            sucursalSeleccionada,
            setSucursalSeleccionada
        }}>
            {children}
        </SucursalContext.Provider>
    )
}

export {
    SucursalProvider
}

export default SucursalContext