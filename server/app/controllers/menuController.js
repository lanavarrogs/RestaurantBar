import Producto from '../models/Producto.js';

const getProducts = async (req, res) => {
    const products = await Producto.find({});
    res.status(200).json(products);
}


const editarProducto  =  async (req, res) => {
    const { id } = req.params;
    
    const producto = await Producto.findById(id);
    
    if(!producto){
        const error = new Error("El producto no existe");
        return res.status(400).json({msg: error.message});
    }

    try {
        producto.nombre = req.body.nombre || producto.nombre;
        producto.precio = req.body.precio || producto.precio;
        producto.descripcion = req.body.descripcion || producto.descripcion;
        producto.tipo = req.body.tipo || producto.tipo;
        producto.imagen = req.body.imagen || producto.imagen;

        const productoAlmacenado = await producto.save();
        return res.status(200).json({msg: "Producto actualizado correctamente"});
    } catch (error) {
        console.log(error)
    }
}   

const obtenerProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findById(id);
        return res.status(200).json(producto);
    } catch (error) {
        console.log(error);
    }
}

const agregarProducto = async (req, res) => {
    const { nombre, precio, descripcion, tipo, imagen } = req.body;
    try {
        const producto = await Producto.create({
            nombre,
            precio,
            descripcion,
            tipo,
            imagen
        });
        return res.status(200).json({msg: "Producto agregado correctamente",producto: producto});
    } catch (error) {
        console.log(error);
    }
}


const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await Producto.findByIdAndDelete(id);
    return res.status(200).json({msg: "Producto eliminado correctamente"});
  }catch(error){
    console.log(error);
  }
}

export { getProducts,obtenerProducto,agregarProducto,editarProducto,eliminarProducto }