import { useState, useEffect } from "react";
import axios from "axios";

const api = "http://localhost:8081/helen/";

export function useGet(endpoint) {
  const url = api + endpoint;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  return { data };
}

export function usePost() {
  const postData = async (endpoint, formData) => {
    const url = api + endpoint;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error(`Error creating publication at ${url}:`, error);
      throw error;
    }
  };

  return { postData };
}

export function useDelete(endpoint) {
    const url = api + endpoint;

    const deletePublication = async (id) => {
        try {
            await axios.delete(`${url}/${id}`);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting publication:', error);
        }
    };

    return { deletePublication };
}