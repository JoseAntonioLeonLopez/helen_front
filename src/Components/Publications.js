import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useFetch } from '../Service/useFetch';

const Publications = () => {
  const { data: publications, refetch: refetchPublications } = useFetch("publications");

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    description: '',
    city: '',
    fkUser: 0
  });

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar cambio de imagen
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setFormData({
      ...formData,
      image: image
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('image', formData.image);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('fkUser', formData.fkUser);

    try {
      await axios.post('http://localhost:8081/helen/publications', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' // Especifica el tipo de contenido
        }
      });
      Swal.fire({
        icon: 'success',
        title: 'Publicación creada exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
      // Actualizar las publicaciones mostradas
      refetchPublications();
    } catch (error) {
      console.error('Error al crear publicación:', error);
      // Mostrar mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al crear la publicación. Por favor, inténtalo de nuevo.',
      });
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        {/* Formulario para crear una nueva publicación */}
        <div className='col-md-6'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <input className='form-control' type="file" name="image" onChange={handleImageChange} required />
            </div>
            <div className='mb-3'>
              <input className='form-control' type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Título" required />
            </div>
            <div className='mb-3'>
              <textarea className='form-control' name="description" value={formData.description} onChange={handleInputChange} placeholder="Descripción" required></textarea>
            </div>
            <div className='mb-3'>
              <input className='form-control' type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Ciudad" required />
            </div>
            <div className='mb-3'>
              <input className='form-control' type="number" name="fkUser" value={formData.fkUser} onChange={handleInputChange} placeholder="ID de Usuario" required />
            </div>
            <button className='btn btn-primary' type="submit">Crear Publicación</button>
          </form>
        </div>

        {/* Mostrar publicaciones existentes */}
        <div className='col-md-6'>
          {publications.map(publication => (
            <div key={publication.idPublication} className='mb-3'>
              <img src={`data:image/jpeg;base64,${publication.image}`} alt="Publicación" className='img-fluid' />
              <h3>{publication.title}</h3>
              <p>{publication.description}</p>
              <p>{publication.city}</p>
              {/* Aquí puedes mostrar más detalles de la publicación si lo deseas */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publications;
