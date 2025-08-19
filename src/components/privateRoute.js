import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContect';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  console.log('PrivateRoute - currentUser:', currentUser);
  console.log('PrivateRoute - loading:', loading);
  console.log('PrivateRoute - adminOnly:', adminOnly);
  console.log('PrivateRoute - location:', location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    console.log('PrivateRoute - No user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && currentUser.role !== 'admin') {
    console.log('PrivateRoute - Not admin, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('PrivateRoute - Rendering children');
  return children;
};

export default PrivateRoute;