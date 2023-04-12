const products = [
  {
    name: 'Cerveza',
    description: 'Cerveza fría de barril',
    price: 3.50,
  },
  {
    name: 'Hamburguesa',
    description: 'Hamburguesa con queso y tocino',
    price: 8.50,
  },
  {
    name: 'Alitas de pollo',
    description: 'Alitas de pollo bañadas en salsa BBQ',
    price: 12.50,
  },
  // Agrega aquí más productos si lo deseas
];


const Producto = ({producto}) => {

  const  {descripcion, precio, nombre, imagen, bebida } = producto

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-4">
        <img className="w-full" src="https://cdn.pixabay.com/photo/2019/06/17/20/13/soft-drink-4280835_1280.jpg" alt="Prueba" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Nombre: {nombre}</div>
            <p className="text-gray-700 text-base">Precio: <span className="font-bold text-xl">${precio}</span></p>
            <p className="text-gray-700 text-base">Descripcion: {descripcion}</p>
        </div>
    </div>
  )
}

export default Producto