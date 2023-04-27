import { useContext } from 'react';
import SucursalContext  from '../context/SucursalProvider';

const useSucursal = () => {
    return useContext(SucursalContext);
}

export default useSucursal;