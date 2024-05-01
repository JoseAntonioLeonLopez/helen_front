import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener el token del localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Decodificar el token para obtener la información del usuario
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.sub); // Establecer el nombre de usuario en el estado
    }
  }, []);

  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <Link to="/">
          <img className="logo-letras" src="/img/helen-letras.gif" alt="Helen Logo" />
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
        <li className={location.pathname === "/add" ? "active" : ""}>
          <Link to="/add">
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
