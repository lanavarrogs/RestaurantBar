import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import AdminDashboard from "../pages/AdminDashboard"
import UserDashboard from "../pages/UserDashboard"
import ManagerDashboard from "../pages/ManagerDashboard"

const RutaProtegida = () => {

    const { auth,cargando } = useAuth()
    
    if(cargando) return 'cargando...'
    if(auth.role === 'admin'){
        return <AdminDashboard />
    }else if(auth.role === 'user'){
        return <UserDashboard />
    }else if(auth.role === 'gerente'){
        return <ManagerDashboard />
    }else{
        return <Navigate to="/" />
    }

}

export default RutaProtegida