import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { API_URL } from "../../Constants/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

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
    return publications.map((publication, index) => (
      <div key={publication.idPublication} className="col-md-4 mb-4">
        <div className="card" style={{ marginBottom: "0" }}>
          {users[index] && (
            <div
              className="card-header"
              style={{
                marginBottom: "0",
                display: "flex",
                alignItems: "center"
              }}
            >
              {users[index].imageUser ? (
                <img
                  src={users[index].imageUser}
                  alt="Imagen de perfil"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
              ) : (
                <img
                  src="/img/user-avatar.svg"
                  alt="Imagen de perfil predeterminada"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
              )}
              <span>{users[index].username}</span>
            </div>
          )}
          <img
            src={publication.image}
            className="card-img-top"
            alt={publication.title}
            style={{
              maxHeight: "300px",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
          <div className="card-body">
            <p className="card-text">
              <small className="text-muted">{publication.city}</small>
            </p>
            <h5 className="card-title">{publication.title}</h5>
            <p className="card-text">{publication.description}</p>
            {/* Renderizar botón de like con el número de likes */}
            {userLikes[publication.idPublication] !== undefined && (
              <button
                onClick={() => handleLikeClick(publication.idPublication)}
                style={{
                  color: userLikes[publication.idPublication] ? "red" : "black",
                }}
              >
                <FontAwesomeIcon
                  icon={
                    userLikes[publication.idPublication]
                      ? solidHeart
                      : regularHeart
                  }
                />
                <b className="pl-2">{likes[publication.idPublication]}</b> 
              </button>
            )}
          </div>
        </div>
      </div>
    ));
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
    </div>
  );
};

export default Publication;
