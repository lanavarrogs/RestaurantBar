import mongoose from 'mongoose'

const sucursalSchema  = mongoose.Schema({
 nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  horario: {
    type: String,
    required: true
  }
},{collection: 'sucursales'});

const Sucursal = mongoose.model('Sucursal', sucursalSchema);

export default Sucursal;