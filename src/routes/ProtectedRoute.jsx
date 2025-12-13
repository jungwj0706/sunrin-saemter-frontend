import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // You can show a loading spinner here
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;