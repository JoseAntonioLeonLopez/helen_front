import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useToken } from "../../Hooks/useHooks";
import Swal from "sweetalert2";

const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'Debes iniciar sesión para acceder a esta página',
    });
    
    return <Navigate to="/" />;
  }

  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
