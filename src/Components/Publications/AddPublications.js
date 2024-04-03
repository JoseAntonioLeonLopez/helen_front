import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddPublications.css";
import { Spinner } from "react-bootstrap";
import { usePost } from "../../Hooks/useHooks";

function AddPublications() {
  const { postData } = usePost();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("multipartFile", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("city", city);
    formData.append("fkUser", 1);

    try {
      await postData("publications/addPublication", formData);

      // Mostrar tostada de éxito
      toast.success("Publicación subida exitosamente", {
        position: "top-right",
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
          position: "top-right",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear Publicación</h2>
      <form onSubmit={handleSubmit}>
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
        <br />
        {loading && <Spinner animation="border" variant="primary" />}{" "}
        {/* Mostrar spinner si loading es true */}
        <br />
        <button type="submit" className="btn btn-primary">
          Crear Publicación
        </button>
      </form>
    </div>
  );
}

export default AddPublications;
