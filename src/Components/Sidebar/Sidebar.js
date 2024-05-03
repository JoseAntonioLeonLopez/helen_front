import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Modal } from "react-bootstrap";
import AddPublications from "../Publications/AddPublications";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    // Obtener el token del sessionStorage
    const token = sessionStorage.getItem("token");

    if (token) {
      // Decodificar el token para obtener la información del usuario
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.sub); // Establecer el nombre de usuario en el estado
    }
  }, []);

  // Función para abrir el modal
  const openModal = () => {
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <Link to="/">
          <img
            className="logo-letras"
            src="/img/helen-letras.gif"
            alt="Helen Logo"
          />
        </Link>
      </div>
      <ul className="list-unstyled components">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">
            <i className="fas fa-home"></i> <span>Publicaciones</span>
          </Link>
        </li>
        <li className={location.pathname === "/user" ? "active" : ""}>
          <Link to="/user">
            <i className="fas fa-user"></i> <span>Perfil: {user}</span>
          </Link>
        </li>
        <li className={location.pathname === "/users" ? "active" : ""}>
          <Link to="/users">
            <i className="fas fa-users"></i> <span>Explorar</span>
          </Link>
        </li>
        {/* Enlace para abrir el modal */}
        <li>
          <Link onClick={openModal}>
            <i className="fas fa-add"></i> <span>Crear Publicación</span>
          </Link>
        </li>
      </ul>
      <div className="logout">
        <Link to="/logout">
          <i className="fas fa-sign-out-alt"></i> <span>Cerrar Sesión</span>
        </Link>
      </div>

      {/* Modal para agregar publicaciones */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header>
          <Modal.Title
            style={{
              margin: "0 auto",
              textAlign: "center",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
          >
            Crear Publicación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <AddPublications closeModal={closeModal} />
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default Sidebar;
