import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const PrivateRoutes = () => {
    const { userAuth } = useContext(AuthContext);
    
    return (
        userAuth.email ? <Outlet/> : <Navigate to="/login"/>
    )
}