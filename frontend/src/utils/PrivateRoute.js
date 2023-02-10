import React, { useContext } from "react";
import AuthContext from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';


export const PrivateRoute = () => {
    const { user } = useContext(AuthContext);
    return user ? <Outlet /> : <Navigate to="/login" />;
}