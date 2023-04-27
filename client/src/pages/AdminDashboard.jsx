import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SidebarAdmin from '../components/SidebarAdmin'

const AdminDashboard = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className='md:flex md:min-h-screen'>
                <SidebarAdmin/>
                <main className='p-10 flex-1'>
                    <Outlet/>
                </main>
            </div>
            
        </>
    );
}


export default AdminDashboard;