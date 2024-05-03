import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../Constants/Constants";
import { Input, Textarea, Spinner } from "@material-tailwind/react";

function AddPublications({ closeModal }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [userFromToken, setUserFromToken] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserFromToken = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const username = decodedToken.sub;
          const response = await axios.get(
            `${API_URL}/users/username/${username}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserFromToken(response.data);
        }
      } catch (error) {
        console.error("Error fetching user from token:", error);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserFromToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("multipartFile", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("city", city);
    formData.append("fkUser", userFromToken.idUser);

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.post(`${API_URL}/publications`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Publicación subida exitosamente.", {
        position: "top-right",
        autoClose: 1200,
      });
      navigate("/");
      closeModal(); // Cierra el modal después de enviar el formulario
    } catch (error) {
      console.error("Error creating publication:", error);

      toast.error(
        "Error al crear la publicación. Por favor, inténtalo de nuevo más tarde.",
        {
          position: "top-right",
          autoClose: 1200,
        }
      );
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="d-inline-block mx-auto">
      <input
        type="file"
        id="image"
        onChange={(e) => setFile(e.target.files[0])}
        accept="image/*"
        className="block w-full mt-1 py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        required
      />
      <br />
      <Input
        type="text"
        maxLength={30}
        id="title"
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <Textarea
        label="Descripción"
        maxLength={100}
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block w-full mt-1 py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
      />
      <br />
      <Input
        type="text"
        id="city"
        maxLength={20}
        label="Ciudad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <br />
      <div className="mt-4 relative">
        {loading && (
          <Spinner
            style={{ position: "absolute", top: "-35px", left: "47%" }}
          />
        )}
        <button
          type="submit"
          className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
        >
          Crear Publicación
        </button>
      </div>
    </form>
  );
}

export default AddPublications;
