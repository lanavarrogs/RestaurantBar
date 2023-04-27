import { useState, createContext, useEffect  } from "react";
import axios from "axios";


const OrderContext = createContext();


const OrderProvider = ({ children }) => {

    const [ totalOrder,setTotalOrder ] = useState(0)
    const [ price, setPrice  ] = useState(0)
    const [ ordenes, setOrdenes] = useState([])
    
    const [ orderItems,setOrderItems ] = useState(() => {
        try{
        const productoStorage = localStorage.getItem('orderProducts');
        return productoStorage ? JSON.parse(productoStorage) : [];
        }catch(error){
        return [];
        }
    }); 


    useEffect(() => {
      localStorage.setItem('orderProducts', JSON.stringify(orderItems))
      let item = 0
      orderItems.forEach(element => {
        item += element.amount
      })
      setTotalOrder(item)
      getPrice()
    },[orderItems])

    useEffect(() => {
      const getOrders = async () => {
        try{
            const { data } =  await axios.get('http://localhost:3000/api/orden/obtenerOrdenes')
            setOrdenes(data)
        }catch(error){
          console.log(error)
        }
      }
      getOrders()

    },[])


    const addItem = product => {
       const inOrder = orderItems.find(productInOrder => productInOrder._id === product._id)
        if(inOrder){
           const items = orderItems.map(productInOrder => (  
                productInOrder._id === product._id ? { ...inOrder, amount: inOrder.amount + 1 } : productInOrder
           )) 
            setOrderItems(items)
       }else{
         setOrderItems([...orderItems, { ...product, amount: 1 }])
       } 

    }

    const getPrice = () => {
      let item = 0
      orderItems.forEach(element => {
        item += element.precio * element.amount
      })
      setPrice(item)
    }

    const removeItem = product => {
      const inOrder = orderItems.find(productInOrder => productInOrder._id === product._id)

      if(inOrder.amount === 1){
        const items = orderItems.filter(productInOrder => productInOrder._id !== product._id)
        setOrderItems(items)
      }else{
        const items = orderItems.map(productInOrder => (  
          productInOrder._id === product._id ? { ...inOrder, amount: inOrder.amount - 1 } : productInOrder
        )) 
        setOrderItems(items)
      }
    }

    const emptyOrder = () => {
      setOrderItems([])
    }


    const getOrdersBySucursal = async (sucursal) => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/orden/obtenerOrdenes/${sucursal}`)
        setOrdenes(data)
      } catch (error) {
        console.log(error)
      }
    }
    
    

    return(
    <OrderContext.Provider
      value={{
        orderItems,
        price,
        totalOrder,
        ordenes,
        setOrderItems,
        addItem,
        removeItem,
        emptyOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  )


}

export{
    OrderProvider
}

export default OrderContext;