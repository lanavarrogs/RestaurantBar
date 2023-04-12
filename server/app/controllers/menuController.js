import Producto from '../models/Producto.js';

const getProducts = async (req, res) => {
    const products = await Producto.find({});
    res.status(200).json(products);
}


export { getProducts }