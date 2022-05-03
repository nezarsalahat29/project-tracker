import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute() {
    const { currentUser } = useAuth();
    return currentUser ? <Outlet /> : <Navigate to='/signin' />;
}
