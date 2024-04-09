import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useGet } from '../../Hooks/useHooks';

function User() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Obtener el token del localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Decodificar el token para obtener la información del usuario
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.sub); // Establecer el nombre de usuario en el estado
    }
  }, []);

  //Sacar el usuario mediante JWT
  const { data: userData } = useGet('users/username/' + username);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  
  console.log(user);

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
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
