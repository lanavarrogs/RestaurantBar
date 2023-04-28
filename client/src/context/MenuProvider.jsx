import axios from "axios"
import { useState, useEffect, createContext } from "react"

const MenuContext = createContext()

const MenuProvider = ({ children }) => {

    const [ products, setProducts] = useState([])
    const [producto, setProducto ] = useState({})

    useEffect(() => {

        const obtenerProductos = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/api/menu/products')
                setProducts(data)
            } catch (error) {
                console.log(error)
            }
        }

        obtenerProductos()

    }, [products])

    const obtenerProducto = async id => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/menu/product/${id}`)
            setProducto(data)
        } catch (error) {
            console.log(error)
        }
    }


    const eliminarProducto = async id => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.delete(`http://localhost:3000/api/menu/eliminarProducto/${id}`,config);
            if(data.msg === "Producto eliminado correctamente"){
                const productosFiltrados = products.filter(usuario => usuario._id !== id)
                setProducts(productosFiltrados)
            }

        }catch (error){
            console.log(error);
        }
    }

    return(
        <MenuContext.Provider 
            value={{ 
                products,
                producto,
                obtenerProducto,
                eliminarProducto 
            }}
         >{children}</MenuContext.Provider>
    )

}

export {
    MenuProvider
}


export default MenuContext
