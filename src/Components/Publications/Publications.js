import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { API_URL } from "../../Constants/Constants";
import './Publications.css';

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
    return publications.map((publication, index) => (
      <div key={publication.idPublication} className="col-md-4 mb-4">
        <div className="card">
          <img src={publication.image} className="card-img-top" alt={publication.title} />
          <div className="card-body">
            <p className='card-text'><small className='text-muted'>{publication.city}</small></p>
            <h5 className="card-title">{publication.title}</h5>
            <p className="card-text">{publication.description}</p>
            {loaded && users[index] && (
              <>
                <div className="card-text">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {users[index].imageUser ? (
                      <img
                        src={users[index].imageUser}
                        alt="Imagen de perfil"
                        style={{
                          background: 'white',
                          width: '150px',
                          height: '150px',
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
                    <span style={{ marginLeft: '10px' }}>{users[index].username}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {/* Verificar si las publicaciones se han cargado y si hay publicaciones */}
        {loaded && publications.length > 0 ? (
          renderPublicationCards()
        ) : (
          // Mostrar mensaje si no hay publicaciones o si no se han cargado
          <div className="col-md-12 text-center">
            <p>{loaded ? 'No hay publicaciones disponibles' : 'Cargando publicaciones...'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publication;
