import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../Constants/Constants";
import './User.css';

function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
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
          setUser(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = (publicationId) => {
    // Función para eliminar una publicación
    console.log(`Eliminar publicación con ID: ${publicationId}`);
  };

  return (
    <div className="mt-4 mb-4">
      {loading ? (
        <div className="row">
          <div className="col-md-12 text-center">
            <p>Cargando...</p>
          </div>
        </div>
      ) : user ? (
        <div className="row">
          <div className="col-md-12 infoUser">
            <div className="d-flex align-items-center mb-4">
              <div>
                <img
                  src={user.imageUser ? user.imageUser : "/img/user-avatar.svg"}
                  alt="Perfil"
                  style={{
                    background: "white",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="ms-3">
                <div>
                  <p>
                    <b>Nombre:</b> {user.name}
                  </p>
                  <p>
                    <b>Email:</b> {user.email}
                  </p>
                  <p>
                    <b>Ciudad:</b> {user.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            {user.usersPublications.length > 0 ? (
              <div className="row">
                {user.usersPublications.map((publication, index) => (
                  <div
                    key={publication.idPublication}
                    className="col-md-4 mb-4"
                  >
                    <div className="card">
                      <img
                        src={publication.image}
                        className="card-img-top"
                        alt={publication.title}
                      />
                      <div className="card-body">
                        <p className="card-text">
                          <small className="text-muted">
                            {publication.city}
                          </small>
                        </p>
                        <h5 className="card-title">{publication.title}</h5>
                        <p className="card-text">{publication.description}</p>
                        <button
                          onClick={() =>
                            handleDelete(publication.idPublication)
                          }
                          className="btn btn-danger"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Agregar divs vacíos para mantener la estructura de filas */}
                {user.usersPublications.length % 3 === 1 && (
                  <div className="col-md-4 mb-4"></div>
                )}
                {user.usersPublications.length % 3 === 2 && (
                  <div className="col-md-4 mb-4"></div>
                )}
              </div>
            ) : (
              <div className="col-md-12 text-center">
                <p>No hay publicaciones disponibles</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-12 text-center">
            <p>No se pudo cargar la información del usuario.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
