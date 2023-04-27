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

    }, [])

    const obtenerProducto = async id => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/menu/product/${id}`)
            setProducto(data)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <MenuContext.Provider 
            value={{ 
                products,
                producto,
                obtenerProducto 
            }}
         >{children}</MenuContext.Provider>
    )

}

export {
    MenuProvider
}


export default MenuContext
