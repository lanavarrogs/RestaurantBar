import Orden from "../models/Orden.js";


const saveOrder = async (req, res) => {
    const { nombreMesero, mesa, pedidos, ubicacion  } = req.body;
    const total = req.body.price;
    
    try {
        const nuevaOrden = new Orden({
            nombreMesero,
            mesa,
            total,
            pedidos,
            ubicacion
        })
        const response = await nuevaOrden.save();
        if(response){
            res.status(200).json({ mensaje: 'Orden creada correctamente' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al crear la orden' });
    }

}

const getOrders = async (req, res) => {
    try {
        const orders = await Orden.find();
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al obtener las ordenes' });
    }
}


const getOrdersById = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await Orden.find(id);
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al obtener la orden' });
    }
}



export { saveOrder,getOrders,getOrdersById }