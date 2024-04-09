import React, { useEffect, useState } from 'react';
import { useUserFromToken } from '../../Hooks/useHooks';

function User() {
  const user = useUserFromToken();

  return (
    <div>
      {user && (
        <div>
          <div>
            {/* Estilo de imagen redonda */}
            <img
              src={user.imageUser != null ? user.imageUser : "/img/user-avatar.svg"} 
              alt="Perfil"
              style={{
                background: 'white',
                width: '150px',
                height: '150px',
                borderRadius: '50%', // Forma redonda
                objectFit: 'cover', // Escalar y recortar la imagen para que se ajuste al contenedor circular
              }}
            />
          </div>
          <br/><br/>
          <div>
            <p><b>Nombre:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Ciudad:</b> {user.city}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
