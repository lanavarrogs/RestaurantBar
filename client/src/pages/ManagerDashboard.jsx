import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import SidebarGerente from "../components/SidebarGerente"

const ManagerDashboard = () => {
  return (
    <>
        <div>
            <Header />
        </div>
        <div className='md:flex md:min-h-screen'>
            <SidebarGerente/>
            <div className='p-10 flex-1'>
                <Outlet/>
            </div>
        </div>
    </>  
  )
}

export default ManagerDashboard