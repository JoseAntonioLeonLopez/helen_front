import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../Constants/Constants";

function User() {
  const [userFromToken, setUserFromToken] = useState(null);

  useEffect(() => {
    const fetchUserFromToken = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const decodedToken = jwtDecode(token); // Decodificar el token
          const username = decodedToken.sub; // Obtener el nombre de usuario del token
          console.log(username);
          const response = await axios.get(`${API_URL}/users/username/${username}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserFromToken(response.data);
        } catch (error) {
          console.error('Error fetching user from token:', error);
        }
      }
    };

    fetchUserFromToken();
  }, []);

  return (
    <div>
      {userFromToken && (
        <div>
          <div>
            {/* Estilo de imagen redonda */}
            <img
              src={userFromToken.imageUser != null ? userFromToken.imageUser : "/img/user-avatar.svg"} 
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
            <p><b>Nombre:</b> {userFromToken.name}</p>
            <p><b>Email:</b> {userFromToken.email}</p>
            <p><b>Ciudad:</b> {userFromToken.city}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
