import FormularioProducto from '../components/FormularioProducto'

const NuevoProducto = () => {
  return (
    <>
        <h1 className="text-4xl font-black">Agregar Producto</h1>
        <div className="mt-10 flex justify-center">
            <FormularioProducto/> 
        </div>
    </>
  )
}

export default NuevoProducto