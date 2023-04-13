import Orden from "../models/Orden.js";


const saveOrder = async (req, res) => {

    const { nombreMesero, mesa, pedidos } = req.body;
    const total = req.body.price;
    
    try {
        const nuevaOrden = new Orden({
            nombreMesero,
            mesa,
            total,
            pedidos
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



export { saveOrder }