import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../Constants/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import { Input } from "@material-tailwind/react";
import "./User.css";

function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPublication, setEditingPublication] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token");

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

          const likesMap = response.data.usersPublications.reduce(
            (acc, publication) => {
              acc[publication.idPublication] = publication.favorites.length;
              return acc;
            },
            {}
          );
          setLikes(likesMap);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = async (publicationId) => {
    confirmAlert({
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que deseas eliminar esta publicación?",
      buttons: [
        {
          label: "Sí",
          onClick: async () => {
            try {
              const token = sessionStorage.getItem("token");
              const response = await axios.delete(
                `${API_URL}/publications/${publicationId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.status === 200) {
                setUser((prevUser) => ({
                  ...prevUser,
                  usersPublications: prevUser.usersPublications.filter(
                    (publication) => publication.idPublication !== publicationId
                  ),
                }));

                toast.success("Publicación borrada exitosamente", {
                  position: "top-right",
                  autoClose: 1200,
                });
              } else {
                throw new Error("Error al eliminar la publicación");
              }
            } catch (error) {
              console.error("Error deleting publication:", error);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un problema al eliminar la publicación. Por favor, inténtalo de nuevo más tarde.",
              });
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleEdit = (publication) => {
    setEditingPublication(publication);
    setTitle(publication.title);
    setDescription(publication.description);
    setCity(publication.city);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setTitle("");
    setDescription("");
    setCity("");
    setEditingPublication(null);
  };

  const handleSubmitEditModal = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const updatedPublication = {
        idPublication: editingPublication.idPublication,
        ...editingPublication,
        title,
        description,
        city,
      };

      const response = await axios.put(
        `${API_URL}/publications/${editingPublication.idPublication}`,
        JSON.stringify(updatedPublication),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const updatedUsersPublications = user.usersPublications.map(
          (publication) =>
            publication.idPublication === updatedPublication.idPublication
              ? updatedPublication
              : publication
        );
        setUser((prevUser) => ({
          ...prevUser,
          usersPublications: updatedUsersPublications,
        }));

        toast.success("Publicación actualizada exitosamente", {
          position: "top-right",
          autoClose: 1200,
        });
        handleCloseEditModal();
      } else {
        toast.error("Error al actualizar la puvlicación. Intentelo de nuevo más tarde.", {
          position: "top-right",
          autoClose: 1200,
        });
        console.error("Error updating publication:", response.data);
      }
    } catch (error) {
      toast.error("Error al actualizar la puvlicación. Intentelo de nuevo más tarde.", {
        position: "top-right",
        autoClose: 1200,
      });
      console.error("Error updating publication:", error);
    }
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
                    <b>Usuario:</b> {user.username}
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
                {user.usersPublications
                  .sort((a, b) => b.idPublication - a.idPublication)
                  .map((publication, index) => (
                    <div
                      key={publication.idPublication}
                      className="col-md-4 mb-4"
                    >
                      <div className="card">
                        <div
                          className="publication-image-container"
                          style={{
                            width: "100%",
                            height: "300px",
                            overflow: "hidden",
                            marginBottom: "10px",
                          }}
                        >
                          <img
                            src={publication.image}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              maxHeight: "300px",
                            }}
                            alt={publication.title}
                          />
                        </div>
                        <div className="card-body">
                          <p className="card-text">
                            <small className="text-muted">
                              {publication.city}
                            </small>
                          </p>
                          <h5 className="card-title">{publication.title}</h5>
                          <p className="card-text">{publication.description}</p>
                          <div className="mb-3">
                            <FontAwesomeIcon
                              icon={solidHeart}
                              className="mr-1"
                            />
                            {likes[publication.idPublication]}
                          </div>
                          <div className="align-items-center">
                            <button
                              onClick={() =>
                                handleDelete(publication.idPublication)
                              }
                              className="btn btn-danger"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button
                              onClick={() => handleEdit(publication)} // Agregar esta línea
                              className="btn btn-primary ms-2"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
      {/* Modal de edición de publicación */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header>
          <Modal.Title className="mx-auto">Editar Publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <form onSubmit={handleSubmitEditModal} className="d-inline-block mx-auto">
            <div className="w-72 mb-3">
              <Input
                label="Título"
                maxLength={30}
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="w-72 mb-3">
              <Input
                as="textarea"
                maxLength={100}
                rows={3}
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label="Descripción"
              />
            </div>
            <div className="w-72 mb-3">
              <Input
                type="text"
                maxLength={20}
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                label="Ciudad"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default User;
