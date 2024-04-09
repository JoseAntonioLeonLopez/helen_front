import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import './Publications.css';
import { useGet, useDelete } from '../../Hooks/useHooks';

const Publication = () => {
  const { data: publications } = useGet('publications');
  const { deletePublication } = useDelete('publications');

  useEffect(() => {
    if (!publications) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al cargar las publicaciones. Por favor, inténtalo de nuevo más tarde.'
      });
    }
  }, [publications]);

  const handleDelete = async (id) => {
    try {
      await deletePublication(id);
    } catch (error) {
      console.error('Error deleting publication:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {/* Verificar si publications es un arreglo antes de mapear sobre él */}
        {Array.isArray(publications) && publications.map((publication) => (
          <div key={publication.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={publication.image} className="card-img-top" alt={publication.title} />
              <div className="card-body">
                <p className='card-text'><small className='text-muted'>{publication.city}</small></p>
                <h5 className="card-title">{publication.title}</h5>
                <p className="card-text">{publication.description}</p>
                <button onClick={() => handleDelete(publication.id)} className="btn btn-danger">Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publication;
