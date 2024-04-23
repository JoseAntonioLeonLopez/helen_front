import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../../Constants/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const Publication = () => {
  const [publications, setPublications] = useState([]);
  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState({});
  const [loaded, setLoaded] = useState(false);

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

  const handleLikeClick = (publicationId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [publicationId]: !prevLikes[publicationId],
    }));
  };

  const renderPublicationCards = () => {
    const rows = [];
    let currentRow = [];
    if (publications.length > 0) {
      for (let i = 0; i < publications.length; i++) {
        const publication = publications[i];
        const user = users[i];
        currentRow.push(
          <div key={publication.idPublication} className="col-md-4 mb-4">
            <div className="card" style={{ marginBottom: "0" }}>
              {user && (
                <div
                  className="card-header"
                  style={{
                    marginBottom: "0",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  {user.imageUser ? (
                    <img
                      src={user.imageUser}
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
                  <span>{user.username}</span>
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
                <button
                  onClick={() => handleLikeClick(publication.idPublication)}
                  style={{
                    color: likes[publication.idPublication] ? "red" : "black",
                  }}
                >
                  <FontAwesomeIcon
                    icon={
                      likes[publication.idPublication]
                        ? solidHeart
                        : regularHeart
                    }
                  />
                </button>
              </div>
            </div>
          </div>
        );

        if (currentRow.length === 3 || i === publications.length - 1) {
          rows.push(
            <div
              key={`row-${rows.length}`}
              className="row justify-content-start"
            >
              {currentRow}
            </div>
          );
          currentRow = [];
        }
      }
    } else {
      currentRow.push(
        <div key="empty" className="col-md-12 text-center">
          <p className="mt-3">No hay publicaciones disponibles</p>
        </div>
      );
      rows.push(
        <div key={`row-${rows.length}`} className="row justify-content-start">
          {currentRow}
        </div>
      );
      currentRow = [];
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
    </div>
  );
};

export default Publication;
