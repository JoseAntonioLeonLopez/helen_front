import React, { useEffect, useState } from 'react';
import { useGet } from '../../Hooks/useHooks';

function User() {
  const [user, setUser] = useState(null);

  //Sacar id del usuario mediante JWT

  const { data: userData } = useGet('users/' + user.idUser);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  return (
    <div>
      <h2>Perfil</h2>
      {user && (
        <div>
          <div>
            {/* Estilo de imagen redonda */}
            <img
              src={user.imageUser} // Suponiendo que el objeto de usuario tiene una propiedad profileImageUrl que contiene la URL de la imagen de perfil
              alt="Perfil"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%', // Forma redonda
                objectFit: 'cover', // Escalar y recortar la imagen para que se ajuste al contenedor circular
              }}
            />
          </div>
          <div>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
