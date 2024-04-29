import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { API_URL } from "../../Constants/Constants";
import PublicationCard from "../../Components/Publications/PublicationCard";

const Publication = ({ idUser }) => {
  const [publications, setPublications] = useState([]);
  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [userFromToken, setUserFromToken] = useState(null);
  const [userLikes, setUserLikes] = useState({}); // Nuevo estado para registrar los likes del usuario

  useEffect(() => {
    const fetchUserFromToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token); // Decodificar el token
          const username = decodedToken.sub; // Obtener el nombre de usuario del token
          const response = await axios.get(`${API_URL}/users/username/${username}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserFromToken(response.data);
        }
      } catch (error) {
        console.error("Error fetching user from token:", error);
      } 
    };

    fetchUserFromToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/publications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPublications(response.data);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching publications:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar las publicaciones. Por favor, inténtalo de nuevo más tarde.",
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const userPromises = publications.map(async (publication) => {
          const response = await axios.get(
            `${API_URL}/users/${publication.fkUser}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return response.data;
        });
        const users = await Promise.all(userPromises);
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar la información de los usuarios. Por favor, inténtalo de nuevo más tarde.",
        });
      }
    };

    if (publications.length > 0) {
      fetchUsers();
    }
  }, [publications]);

  useEffect(() => {
    // Recopilar el número total de likes para cada publicación
    const likesCount = publications.reduce((acc, publication) => {
      acc[publication.idPublication] = publication.favorites.length;
      return acc;
    }, {});
    setLikes(likesCount);
  }, [publications]);

  useEffect(() => {
    // Recopilar los likes dados por el usuario para cada publicación
    const userLikesMap = publications.reduce((acc, publication) => {
      const likedByUser = publication.favorites.some(favorite => favorite.fkUser === userFromToken.idUser);
      acc[publication.idPublication] = likedByUser;
      return acc;
    }, {});
    setUserLikes(userLikesMap);
  }, [publications, userFromToken]);

  const handleLikeClick = async (publicationId) => {
    try {
      const token = localStorage.getItem("token");
      const liked = userLikes[publicationId];
  
      if (liked) {
        // Si ya le dio like, eliminamos el like de la base de datos
        await axios.delete(`${API_URL}/userFav/${userFromToken.idUser}/${publicationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Si no le ha dado like, agregamos el like a la base de datos
        await axios.post(
          `${API_URL}/userFav/${publicationId}`,
          { fkUser: userFromToken.idUser },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
  
      // Actualizar el estado likes después de agregar o eliminar el like
      const updatedLikes = { ...likes };
      updatedLikes[publicationId] = liked ? updatedLikes[publicationId] - 1 : updatedLikes[publicationId] + 1;
      setLikes(updatedLikes);
      
  
      // Alternar entre dar y quitar like
      setUserLikes((prevUserLikes) => ({
        ...prevUserLikes,
        [publicationId]: !liked,
      }));
    } catch (error) {
      console.error("Error liking/unliking publication:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al dar/quitar like a la publicación. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };  

  const renderPublicationCards = () => {
    // Ordenar las publicaciones por idPublication de manera descendente
    const sortedPublications = publications.sort((a, b) => b.idPublication - a.idPublication);
    const rows = [];
    for (let i = 0; i < sortedPublications.length; i += 3) {
      const rowItems = [];
      for (let j = i; j < i + 3 && j < sortedPublications.length; j++) {
        rowItems.push(
          <PublicationCard
            key={sortedPublications[j].idPublication}
            publication={sortedPublications[j]}
            user={users[j]}
            liked={userLikes[sortedPublications[j].idPublication]}
            likes={likes[sortedPublications[j].idPublication]}
            onLikeClick={() => handleLikeClick(sortedPublications[j].idPublication)}
          />
        );
      }
      rows.push(
        <div className="row" key={i}>
          {rowItems}
        </div>
      );
    }
    return rows;
  };
  

  return (
    <div className="container">
      {loaded ? (
        renderPublicationCards()
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <p>Cargando publicaciones...</p>
          </div>
        </div>
      )}
      {publications.length !== 0 ? (
        <div></div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <p>No hay publicaciones disponibles</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Publication;
