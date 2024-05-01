import React, { useEffect } from 'react';
import './Logout.css';

function Logout() {
  useEffect(() => {
    // Limpiar el token de autenticación del sessionStorage
    sessionStorage.removeItem('token');
    
    // Redirigir a la página de inicio después de cerrar sesión
    window.location.href = '/login';
  }, []); // Sin dependencias para que useEffect se ejecute solo una vez

  return (
    <div className='mainSpinner'>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Cerrando sesión...</span>
      </div>
    </div>
  );
}

export default Logout;