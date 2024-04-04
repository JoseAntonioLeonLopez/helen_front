import React, { useEffect } from 'react';
import { useLogout } from '../../Hooks/useHooks'; 
import './Logout.css';

function Logout() {
  const { logout } = useLogout(); 

  useEffect(() => {
    const logoutAndRedirect = async () => {
      try {
        await logout();
        // Redirige a la página de inicio después de cerrar sesión
        window.location.href = '/';
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };

    logoutAndRedirect(); // Llama a la función para cerrar sesión y redirigir
  }, [logout]); 

  return (
    <div className='mainSpinner'>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Cerrando sesión...</span>
      </div>
    </div>
  );
}

export default Logout;
