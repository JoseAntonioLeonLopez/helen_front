import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Logout() {

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = '/';
    }, 1000); 

    return () => clearTimeout(timeout); 
  }, []);

  return (
    <div>
      <h2>Logout</h2>
      <p>Pantalla de cerrar sesión</p>
    </div>
  );
}

export default Logout;
