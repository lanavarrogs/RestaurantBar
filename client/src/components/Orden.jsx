import axios from 'axios'
import { useState } from 'react'
import useOrden from '../hooks/useOrden'
import Swal from 'sweetalert2'
import useAuth from '../hooks/useAuth'

const Orden = () => {
  
  const { orderItems, removeItem, price,emptyOrder } = useOrden()
  const [ mesa, setMesa ] = useState(1)
  const {auth} = useAuth() 

  const handleEmptyOrder = () => {
    Swal.fire({
      title: 'Estas seguro que deseas cancelar?',
      text: "Se borrara todo tu pedido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Tu pedido ha sido borrado.',
          'success'
        )
        emptyOrder()
      }
    })
  }

  const handleConfirmOrder = async () => {
    if(orderItems.length === 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Agrega elementos a la orden',
      })
      return
    }

    try{
      const pedidos = orderItems
      const nombreMesero = auth.nombre
      const { data } = await axios.post('http://localhost:3000/api/orden/crearOrden',{nombreMesero,mesa,price,pedidos});
     
      if(data.mensaje === 'Orden creada correctamente'){
        Swal.fire({
          icon: 'success',
          title: 'Orden creada',
          text: 'Tu orden ha sido creada',
        })
        
        emptyOrder()
      }

    }catch(error){
      console.log(error)
    }


  }


  return (
      <aside className='md:w-80 lg:w-96 px-5 py-10 bg-sky-600'>
        <h1 className="text-4xl font-bold text-center text-white">Orden</h1>
        <select 
        className='block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mt-10'
        value={mesa}
        onChange={e => setMesa(Number(e.target.value))}
        >
          <option value="1">Mesa 1</option>
          <option value="2">Mesa 2</option>
          <option value="3">Mesa 3</option>
          <option value="4">Mesa 4</option>
          <option value="5">Mesa 5</option>
        </select>
        <div className='px-2 my-5'>
          {orderItems.map(orderproduct =>
          <div className='md:flex items-center justify-between my-4' key={orderproduct._id}> 
            <p className='text-xl text-white'>{orderproduct.nombre}: {orderproduct.amount}</p>
            <button
              className='uppercase max-h-12 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 '
              onClick={() => removeItem(orderproduct)}
            >Eliminar</button>
          </div>
            )}
        </div>
        { orderItems.length >0 ? 
         (
          <>
            <p className='text-4xl font-bold text-white text-center m-4'>Total: ${price}</p>
            <div className='md:flex items-center justify-between'>
              <button className='uppercase border-2 border-white bg-transparent text-white px-4 py-2 rounded-lg hover:bg-sky-800 my-5' onClick={handleConfirmOrder}>Comprar</button>
              <button className='uppercase  bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 my-5' onClick={handleEmptyOrder}>Cancelar</button>
            </div>
          </>
         ): <p className='text-2xl font-bold text-white text-center m-4'>No hay elementos en la orden</p> }
      
      </aside>
  )
}

export default Orden