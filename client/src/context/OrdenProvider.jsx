import { useState, createContext, useEffect  } from "react";

const OrderContext = createContext();


const OrderProvider = ({ children }) => {

    const [ totalOrder,setTotalOrder ] = useState(0)
    const [ price, setPrice  ] = useState(0)
    
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

    return(
    <OrderContext.Provider
      value={{
        orderItems,
        price,
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