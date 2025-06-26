import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Relative path from PrivateRoute.jsx

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>; // Or a spinner
  }

  // If user is null (not logged in), redirect to signin
  // If user is not null, render the children
  return user ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;