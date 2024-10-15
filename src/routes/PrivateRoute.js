import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, roles }) => {
    const token = localStorage.getItem('token');

    // If the token doesn't exist, redirect to the login page
    if (!token) {
        console.log("Go back");
        return <Navigate to="/login" />;
    }

    const decodedToken = jwtDecode(token);
    const isExpired = decodedToken.exp * 1000 < Date.now();

    if (isExpired) {
        return <Navigate to="/session-expired" />;
    }

    const userRoles = decodedToken.roles.map(role => role.replace("ROLE_", ""));
    const hasRequiredRole = roles.some(role => userRoles.includes(role));

    if (!hasRequiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;
