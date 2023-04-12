import mongoose from "mongoose";

const productoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    tipo:{
        type: String,
        required: true,
    },
    precio:{
        type: Number,
        required: true,
    },
    imagen:{
        type: String,
        required: true,
    },
    descripcion:{
        type: String,
        required: true,
    }
});

const Producto = mongoose.model('Producto', productoSchema);
export default Producto