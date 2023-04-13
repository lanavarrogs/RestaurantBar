import { useContext } from "react";
import OrdenContext from '../context/OrdenProvider';

const useCart  = () => {
    return useContext(OrdenContext)
}

export default useCart