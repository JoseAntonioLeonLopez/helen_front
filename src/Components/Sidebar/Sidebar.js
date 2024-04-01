import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <Link to="/">
          <img src="/img/helen.svg" alt="Helen Logo" />
        </Link>
      </div>
      <ul className="list-unstyled components">
        <li>
          <Link to="/">
            <i className="fas fa-home"></i> Publicaciones
          </Link>
        </li>
        <li>
          <Link to="/user">
            <i className="fas fa-user"></i> Perfil
          </Link>
        </li>
        <li>
          <Link to="/users">
            <i className="fas fa-users"></i> Explorar
          </Link>
        </li>
        <li>
          <Link to="/topPublications">
            <i className="fas fa-star"></i> Top Publicaciones
          </Link>
        </li>
      </ul>
      <div className="logout">
        <Link to="/logout">
          <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
