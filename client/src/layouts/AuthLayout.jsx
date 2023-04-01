import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="background_rb">
      <Outlet/>
    </div>
    
  )
}

export default AuthLayout