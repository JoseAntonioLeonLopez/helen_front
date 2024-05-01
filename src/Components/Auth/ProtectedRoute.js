import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = ({ element, ...rest }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'Debes iniciar sesión para acceder a esta página',
    });
    
    return <Navigate to="/auth" replace/>;
  }

  return <Outlet/>;
};

export default ProtectedRoute;
