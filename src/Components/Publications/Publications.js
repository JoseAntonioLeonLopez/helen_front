import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { API_URL } from "../../Constants/Constants";

const Publication = () => {
  const [publications, setPublications] = useState([]);
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false); // Estado local para controlar si las publicaciones se han cargado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/publications`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPublications(response.data);
        setLoaded(true); // Establecer el estado de cargado a verdadero
      } catch (error) {
        console.error('Error fetching publications:', error);
        // Mostrar un mensaje de error si no se pudieron cargar las publicaciones
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al cargar las publicaciones. Por favor, inténtalo de nuevo más tarde.'
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const userPromises = publications.map(async (publication) => {
          const response = await axios.get(`${API_URL}/users/${publication.fkUser}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          return response.data;
        });
        const users = await Promise.all(userPromises);
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al cargar la información de los usuarios. Por favor, inténtalo de nuevo más tarde.'
        });
      }
    };

    if (publications.length > 0) {
      fetchUsers();
    }
  }, [publications]);

  const renderPublicationCards = () => {
    const rows = [];
    let currentRow = [];

    for (let i = 0; i < publications.length; i++) {
      const publication = publications[i];
      const user = users[i];
      currentRow.push(
        <div key={publication.idPublication} className="col-md-4 mb-4">
          <div className="card">
            <img src={publication.image} className="card-img-top" alt={publication.title} style={{ maxHeight: '300px', objectFit: 'cover', cursor: 'pointer' }} />
            <div className="card-body">
              <p className='card-text'><small className='text-muted'>{publication.city}</small></p>
              <h5 className="card-title">{publication.title}</h5>
              <p className="card-text">{publication.description}</p>
              {loaded && user && (
                <>
                  <div className="card-text">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {user.imageUser ? (
                        <img
                          src={user.imageUser}
                          alt="Imagen de perfil"
                          style={{
                            background: 'white',
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <img
                          src="/img/user-avatar.svg"
                          alt="Imagen de perfil predeterminada"
                          style={{
                            background: 'white',
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      )}
                      <span style={{ marginLeft: '10px' }}>{user.username}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      );

      // Agregar la fila actual al conjunto de filas cuando alcanza un tamaño de 3 o cuando sea la última publicación
      if (currentRow.length === 3 || i === publications.length - 1) {
        rows.push(
          <div key={`row-${rows.length}`} className="row justify-content-start">
            {currentRow}
          </div>
        );
        currentRow = [];
      }
    }

    return rows;
  };

  return (
    <div className="container">
      {loaded ? (
        renderPublicationCards()
      ) : (
        // Mostrar mensaje si no se han cargado las publicaciones
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <p>Cargando publicaciones...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Publication;
