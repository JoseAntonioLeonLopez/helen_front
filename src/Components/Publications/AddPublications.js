import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './AddPublications.css';
import { Spinner } from 'react-bootstrap'; // Importar Spinner de react-bootstrap

function AddPublications() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar la visibilidad del spinner

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Activar el spinner cuando se envíe el formulario

    const formData = new FormData();
    formData.append("multipartFile", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("city", city);
    formData.append("fkUser", 1);

    try {
      const response = await axios.post(
        "http://localhost:8081/helen/publications/addPublication",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      // Mostrar tostada de éxito
      toast.success("Publicación subida exitosamente", {
        position: 'top-right'
      });

      // Redireccionar a la página de publicaciones después de un breve retraso
      setTimeout(() => {
        window.location.href = "/publications";
      }, 1000);
    } catch (error) {
      console.error("Error creating publication:", error);

      // Mostrar tostada de error
      toast.error(
        "Error al crear la publicación. Por favor, inténtalo de nuevo más tarde.",
        {
          position: 'top-right'
        }
      );
    } finally {
      setLoading(false); // Desactivar el spinner después de que se complete la carga o ocurra un error
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear Publicación</h2>
      <form onSubmit={handleSubmit}>
      {loading && <Spinner animation="border" variant="primary" />} {/* Mostrar spinner si loading es true */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Imagen:
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Título:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descripción:
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            Ciudad:
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Crear Publicación
        </button>
      </form>
    </div>
  );
}

export default AddPublications;
