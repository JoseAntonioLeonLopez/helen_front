import { useState, useEffect } from "react";
import axios from "axios";

const api = "http://localhost:8081/helen/";

// Nuevo hook personalizado que encapsula la lógica para obtener el token
export function useAuthorizationHeader() {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
}

export function useGet(endpoint) {
  const url = api + endpoint;
  const { headers } = useAuthorizationHeader(); // Obtener los encabezados de autorización
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, { headers });
        setData(response.data);
      } catch (error) {
        console.error(`Error fetching data ${url}:`, error);
      }
    };

    fetchData();
  }, [url, headers]);

  return { data };
}

export function usePostPublication() {
  const { headers } = useAuthorizationHeader(); // Obtener los encabezados de autorización

  const postData = async (endpoint, formData) => {
    const url = api + endpoint;
    try {
      const response = await axios.post(url, formData, {
        headers: { ...headers, "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error creating ${url}:`, error);
      throw error;
    }
  };

  return { postData };
}

export function usePostLogin() {
  const postData = async (endpoint, formData) => {
    const url = api + endpoint;
    try {
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error creating ${url}:`, error);
      throw error;
    }
  };

  return { postData };
}

export function usePostRegister() {
  const postData = async (formData) => {
    const url = "http://localhost:8081/helen/register";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        return data;
      } else {
        throw new Error("Error al registrar el usuario");
      }
    } catch (error) {
      throw error;
    }
  };

  return { postData };
}

export function usePost() {
  const { headers } = useAuthorizationHeader(); // Obtener los encabezados de autorización

  const postData = async (endpoint, formData) => {
    const url = api + endpoint;
    try {
      const response = await axios.post(url, formData, {
        headers: { ...headers, "Content-Type": "application/json" },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error creating ${url}:`, error);
      throw error;
    }
  };

  return { postData };
}

export function useDelete(endpoint) {
  const url = api + endpoint;
  const { headers } = useAuthorizationHeader(); // Obtener los encabezados de autorización

  const deletePublication = async (id) => {
    try {
      await axios.delete(`${url}/${id}`, { headers });
      window.location.reload();
    } catch (error) {
      console.error(`Error deleting ${url}:`, error);
    }
  };

  return { deletePublication };
}

export function useLogout() {
  const logout = () => {
    // Limpiar el token de autenticación del almacenamiento local
    localStorage.removeItem("token");
    // Redireccionar a la página de inicio de sesión
    window.location.href = "/login";
  };

  return { logout };
}
