import React from 'react'
import Producto from '../components/Producto'
import Header from '../components/Header'
import Orden from '../components/Orden'
import useMenu from '../hooks/useMenu'
import useOrden from '../hooks/useOrden'

const UserDashboard = () => {

    const { products } = useMenu()

  return (
    <>
        <div>
            <Header/>
        </div>

        <div className='md:flex md:min-h-screen'>
            <Orden/>
        
            <main className='container max-w-[95%] mx-auto md:w-95 p-4'>
                <h1 className="text-4xl font-bold my-5 text-center">Menú</h1>
                <div className="grid grid-s-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map( product => (
                            <Producto
                                key={product._id}
                                producto = {product}
                            />
                        ))}
                </div>
                
            </main>
        </div>
    </>
    )
}

export default UserDashboard