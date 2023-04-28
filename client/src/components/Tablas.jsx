import useOrden from '../hooks/useOrden'
import useSucursal from '../hooks/useSucursal'

const Tablas = () => {

 const { ordenes } = useOrden()
 const { sucursal,obtenerSeleccion } = useSucursal()

 const total = ordenes.reduce((accumulator, order) => accumulator + order.total, 0);

 

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Dashboard de Administrador</h1>
      <h2 className="text-xl font-bold mb-2">Ganancias del Restaurante</h2>
      <div className="shadow overflow-hidden rounded-md">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mesero</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mesa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurante</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ordenes.map(orden => (
              <tr key={orden._id}>
                <td className="px-6 py-4 whitespace-nowrap">{orden.nombreMesero}</td>
                <td className="px-6 py-4 whitespace-nowrap">{orden.mesa}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{obtenerSeleccion(orden.ubicacion)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{
                  new Date(orden.fecha).toLocaleDateString('es-MX')
                }</td>
                <td className="px-6 py-4 whitespace-nowrap">${orden.total}</td>
              </tr>
            ))}
            <tr className="bg-gray-50">
              <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-right font-medium">Total:</td>
              <td className="px-6 py-4 whitespace-nowrap font-medium">${total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
)

}

export default Tablas