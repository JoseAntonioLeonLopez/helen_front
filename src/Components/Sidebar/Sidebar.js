import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <Link to="/publications">
          <img className="logo-letras" src="/img/helen-letras.gif" alt="Helen Logo" />
        </Link>
      </div>
      <ul className="list-unstyled components">
        <li className={location.pathname === "/publications" ? "active" : ""}>
          <Link to="/publications">
            <i className="fas fa-home"></i> <span>Publicaciones</span>
          </Link>
        </li>
        <li className={location.pathname === "/user" ? "active" : ""}>
          <Link to="/user">
            <i className="fas fa-user"></i> <span>Perfil</span>
          </Link>
        </li>
        <li className={location.pathname === "/users" ? "active" : ""}>
          <Link to="/users">
            <i className="fas fa-users"></i> <span>Explorar</span>
          </Link>
        </li>
        <li className={location.pathname === "/publications/top" ? "active" : ""}>
          <Link to="/publications/top">
            <i className="fas fa-star"></i> <span>Top Publicaciones</span>
          </Link>
        </li>
        <li className={location.pathname === "/publications/add" ? "active" : ""}>
          <Link to="/publications/add">
            <i className="fas fa-add"></i> <span>Crear Publicación</span>
          </Link>
        </li>
      </ul>
      <div className="logout">
        <Link to="/logout">
          <i className="fas fa-sign-out-alt"></i> <span>Cerrar Sesión</span>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
