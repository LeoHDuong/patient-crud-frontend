import React from 'react';
import { Navigate } from 'react-router-dom';
import SessionExpired from '../component/SessionExpired';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check if the token exists

    // If there's no token, redirect to login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now(); // Check if the token has expired

        if (isExpired) {
            // If the token is expired, redirect to login page
            localStorage.removeItem('token'); // Optionally clear the token from localStorage
            return <SessionExpired />;
        }
    } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token'); // Optionally clear the token from localStorage
        return <SessionExpired />;
    }

    // If token exists and is valid, allow access to the route
    return children;
};

export default PrivateRoute;
