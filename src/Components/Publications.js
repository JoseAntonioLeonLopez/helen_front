import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const PublicationForm = () => {
  return (
    <div className='container App'>
      <h2>Publicaciones</h2>
      <a href='/users' className="btn btn-primary">Usuarios</a>
    </div>
  );
};

export default PublicationForm;
