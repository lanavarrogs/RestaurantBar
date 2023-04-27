import ProductoVista from '../components/ProductoVista'
import useMenu from '../hooks/useMenu'

const Productos = () => {

    const { products } = useMenu()

  return (
    <>
        <h1 className="text-4xl font-black">Productos</h1>
        <div className="bg-white shadow mt-10 rounded-lg">
            {products.length ?
                products.map( (producto,index) => (
                    <ProductoVista
                        key={index}
                        producto={producto}
                    />
                ))
            : <p className="text-center text-gray-600 uppercase p-5">No hay productos</p>}
        </div>
    </>
  )
}

export default Productos