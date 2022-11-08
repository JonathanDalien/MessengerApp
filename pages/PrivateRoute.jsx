import React, { useContext } from 'react'
import { AuthContext } from '../src/context/auth'
import { Outlet, Route, Navigate } from "react-router-dom"
import { auth } from '../src/firebase';


const PrivateRoute = () => {
    const { user } = useContext(AuthContext);

    return user ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute