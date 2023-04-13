import mongoose from "mongoose";


const ordenSchema = mongoose.Schema({
    nombreMesero:{
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    mesa: {
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    pedidos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    }],
    
});

const Orden = mongoose.model('Orden', ordenSchema);
export default Orden