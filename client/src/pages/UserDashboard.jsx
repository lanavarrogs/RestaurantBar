import React from 'react'
import Producto from '../components/Producto'
import Header from '../components/Header'
import useMenu from '../hooks/useMenu'


const UserDashboard = () => {

    const { products } = useMenu()

  return (
    <>
        <div>
            <Header/>
        </div>
        <div className='container max-w-[95%] mx-auto md:w-95'>
           <h1 className="text-4xl font-bold my-5 text-center">Menú</h1>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map( product => (
                    <Producto
                        key={product._id}
                        producto = {product}
                    />
                ))}
           </div>
        </div>
    </>
    )
}

export default UserDashboard