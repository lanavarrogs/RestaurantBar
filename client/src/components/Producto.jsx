import useOrden from '../hooks/useOrden'

const Producto = ({producto}) => {

  const  {descripcion, precio, nombre, imagen, bebida } = producto
  const { addItem } = useOrden()
  
  const setItem = () => {
    addItem(producto)
  }


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-4">
        <img className="w-full" src={imagen} alt="Prueba" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{nombre}</div>
            <div className="h-28 my-2">
              <p className="text-gray-700 text-base">Precio: <span className="font-bold text-xl">${precio}</span></p>
              <p className="text-gray-700 text-base mb-4">Descripcion: {descripcion}</p>
            </div>
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mt-2" onClick={setItem}>Agregar a la orden</button>
        </div>
    </div>
  )
}

export default Producto