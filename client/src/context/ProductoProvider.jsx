import axios from "axios";
import { useState,createContext, useEffect } from "react";

const ProductoContext = createContext();

const ProductoProvider = ({ children }) => {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const obtenerProductos  = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/productos/obtenerProductos")
                setProductos(data)
                console.log(productos)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProductos()
    },[])
    

    return(
        <ProductoContext.Provider value={{productos, setProductos}}>
            {children}
        </ProductoContext.Provider>
    )

}

export {
    ProductoProvider
}

export default ProductoContext