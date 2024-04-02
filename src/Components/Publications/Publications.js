import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Publications.css';

const Publication = () => {
  const [publications, setPublications] = useState([]); // Inicializar publications como un arreglo vacío

  // Función para obtener todas las publicaciones
  const fetchPublications = async () => {
    try {
      const response = await axios.get('http://localhost:8081/helen/publications');
      setPublications(response.data); // Establecer las publicaciones en el estado
    } catch (error) {
      console.error('Error fetching publications:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al cargar las publicaciones. Por favor, inténtalo de nuevo más tarde.'
      });
    }
  };

  // Llamar a fetchPublications al cargar el componente
  useEffect(() => {
    fetchPublications();
  }, []);

  return (
    <div className="container">
      <h2>Publicaciones</h2>
      <p>Pantalla con todas las publicaciones con scroll infinito</p>

      <div className="row">
        {/* Verificar si publications es un arreglo antes de mapear sobre él */}
        {Array.isArray(publications) && publications.map((publication) => (
          <div key={publication.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={publication.image} className="card-img-top" alt={publication.title} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <p className='card-text'><small className='text-muted'>{publication.city}</small></p>
                <h5 className="card-title">{publication.title}</h5>
                <p className="card-text">{publication.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publication;
