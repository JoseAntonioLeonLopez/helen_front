import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { API_URL } from "../../Constants/Constants";
import './Publications.css';

const Publication = () => {
  const [publications, setPublications] = useState([]);
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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/publications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Eliminar la publicación localmente
      setPublications(publications.filter(pub => pub.idPublication !== id));
      // Mostrar mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'La publicación ha sido eliminada exitosamente.'
      });
    } catch (error) {
      console.error('Error deleting publication:', error);
      // Mostrar mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al eliminar la publicación. Por favor, inténtalo de nuevo más tarde.'
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {/* Verificar si las publicaciones se han cargado y si hay publicaciones */}
        {loaded && Array.isArray(publications) && publications.length > 0 ? (
          publications.map((publication) => (
            <div key={publication.idPublication} className="col-md-4 mb-4">
              <div className="card">
                <img src={publication.image} className="card-img-top" alt={publication.title} />
                <div className="card-body">
                  <p className='card-text'><small className='text-muted'>{publication.city}</small></p>
                  <h5 className="card-title">{publication.title}</h5>
                  <p className="card-text">{publication.description}</p>
                  <button onClick={() => handleDelete(publication.idPublication)} className="btn btn-danger">Eliminar</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Mostrar mensaje si no hay publicaciones, si no se han cargado o si ocurrió un error al cargar
          <div className="col-md-12 text-center">
            <p>{loaded ? 'No hay publicaciones disponibles' : 'Cargando publicaciones...'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publication;
