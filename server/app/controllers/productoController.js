import Producto from "../models/Producto.js";

const getProductos = async (req,res) => {
    try {
        const producto = await Producto.find()
        return res.status(200).json(producto)
    } catch (error) {
        console.log(error)
    }
}


export { getProductos }