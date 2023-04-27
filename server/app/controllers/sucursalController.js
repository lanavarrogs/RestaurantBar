import Sucursal from "../models/Sucursales.js";


const getSucursal = async (req,res) => {
    try {
        const sucursal = await Sucursal.find();
        return res.status(200).json(sucursal);
    } catch (error) {
        console.log(error);
    }
}

const crearSucursal = async (req,res) => {
    const sucursal = req.body;
    const newSucursal = new Sucursal(sucursal);
    try {
        await newSucursal.save();
        return res.status(201).json(newSucursal);
    } catch (error) {
        console.log(error);
    }
}

export { getSucursal,crearSucursal }