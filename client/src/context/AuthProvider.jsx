import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

const AuthProvider = ({children}) => {
  
  const [auth,setAuth] = useState({})
  const [loading,setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    
    const autenticarUsuario = async() => {
      const token = localStorage.getItem('token')
    
      if(!token){
        setLoading(false)
        console.log('no hay token')
        return
      }

      const config = {
       headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        } 
      }

      try {
        const { data } = await axios.post('http://localhost:3000/api/usuarios/user',{},config) 
        setAuth(data)
        navigate('/dashboard') 
      } catch (error) {
        setAuth({})
      }
      
      setLoading(false)
      


    }
    autenticarUsuario() 
  },[])


  return(
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}

export {
  AuthProvider
}

export default AuthContext;