import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import { usePostPublication, useUserFromToken } from "../../Hooks/useHooks";

function AddPublications() {
  const { postData } = usePostPublication();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useUserFromToken();


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("multipartFile", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("city", city);
    formData.append("fkUser", user.idUser);

    try {
      await postData("publications", formData);

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
    <div className="max-w-md mx-auto mt-5">
      <form
        onSubmit={handleSubmit}
        className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Imagen:
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            className="appearance-none bg-gray-800 border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Título:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="appearance-none bg-gray-800 border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Descripción:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="appearance-none bg-gray-800 border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Ciudad:
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="appearance-none bg-gray-800 border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          {loading && <Spinner animation="border" variant="light" />}{" "}
          {/* Mostrar spinner si loading es true */}
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear Publicación
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPublications;
