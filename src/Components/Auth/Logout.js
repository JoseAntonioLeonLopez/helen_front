import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import './Logout.css';

function Logout() {

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = '/';
    }, 1000); 

    return () => clearTimeout(timeout); 
  }, []);

  return (
    <div className='mainSpinner'>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Cerrando sesión...</span>
      </div>
    </div>
  );
}

export default Logout;
