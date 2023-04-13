import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import AdminDashboard from "../pages/AdminDashboard"
import UserDashboard from "../pages/UserDashboard"

const RutaProtegida = () => {

    const { auth,cargando } = useAuth()
    
    if(cargando) return 'cargando...'
    return(
        <>

            {auth._id ? <UserDashboard/> : <Navigate to='/'/>}
        </>
    )

}

export default RutaProtegida