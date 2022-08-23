import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    return localStorage.getItem('jwt') ? <Outlet /> : <Navigate to="/signin" replace />

};

export default ProtectedRoute;