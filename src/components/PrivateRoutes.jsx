import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const user = true;
  return (
    <div>
        {
            user ? <Outlet/> : <Navigate to = '/login'/>
        }
    </div>
  )
}

export default PrivateRoutes
