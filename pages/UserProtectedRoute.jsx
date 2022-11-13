import React, { useContext } from 'react'
import {
    Routes,
    Route,
    Link,
    Navigate,
    Outlet,
} from 'react-router-dom';

const UserProtectedRoute = ({ user, redirectPath = "/", children }) => {

    if (user) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;

};

export default UserProtectedRoute
