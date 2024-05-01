import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../../Constants/Constants";
import axios from "axios";
import "./Auth.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    firstSurname: "",
    secondSurname: "",
    gender: "1",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    city: "",
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }).then((response) => response.json());

      if (response.token) {
        sessionStorage.setItem("token", response.token);
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Usuario o contraseña incorrectos",
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario o contraseña incorrectos",
      });
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(API_URL + "/register", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al registrar el usuario",
        });
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar el usuario",
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="auth container-fluid">
      <div className="row justify-content-center align-items-start vh-100">
        <div className="col-md-6">
          <div className="sidenav text-center">
            <div className="login-main-text d-flex flex-column align-items-center">
              <img
                src="/img/helen-letras.gif"
                alt="logo"
                style={{ width: "150px", marginTop: "50px" }}
              />
              <h2 style={{ color: "#fff" }}>¡Comparte experiencias!</h2>
              <button radius="sm" onClick={toggleLoginModal} className="mt-3"> Iniciar Sesión</button>
              <button radius="sm" onClick={toggleRegisterModal} className="mt-3">Registrarse</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para iniciar sesión */}
      <Modal show={showLoginModal} onHide={toggleLoginModal}>
        <Modal.Header closebutton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Usuario</label>
              <input type="text" className="form-control" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <br />
            <div className="form-group">
              <label>Contraseña</label>
              <div className="input-group">
                <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <div className="input-group-append">
                  <button variant="outline-secondary" onClick={togglePasswordVisibility}>
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>
            </div>
            <br />
            <button type="submit" className="btn btn-black">Entrar</button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal para registrarse */}
      <Modal show={showRegisterModal} onHide={toggleRegisterModal}>
        <Modal.Header closebutton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Nombre de usuario</label>
              <input type="text" className="form-control" name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
            </div>
            <br />
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" className="form-control" name="name" placeholder="Nombre" onChange={handleChange} required />
            </div>
            <br />
            <div className="form-group">
              <label>Primer Apellido</label>
              <input type="text" className="form-control" name="firstSurname" placeholder="Primer Apellido" onChange={handleChange} required />
            </div>
            <br />
            <div className="form-group">
              <label>Segundo Apellido</label>
              <input type="text" className="form-control" name="secondSurname" placeholder="Segundo Apellido" onChange={handleChange} />
            </div>
            <br />
            <div className="form-group">
              <label>Género</label>
              <select className="form-control" name="gender" onChange={handleChange} required>
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>
              </select>
            </div>
            <br />
            <div className="form-group">
              <label>Correo electrónico</label>
              <input type="email" className="form-control" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
            </div>
            <br />
            <div className="form-group">
              <label>Contraseña</label>
              <input type={showPassword ? "text" : "password"} className="form-control" name="password" placeholder="Contraseña" onChange={handleChange} required />
            </div>
            <br />
            <div className="form-group">
              <label>Confirmar Contraseña</label>
              <input type="password" className="form-control" name="confirmPassword" placeholder="Confirmar Contraseña" onChange={handleChange} required />
            </div>
            <br />
            <div className="form-group">
              <label>Número de teléfono</label>
              <input type="text" className="form-control" name="phoneNumber" placeholder="Número de teléfono" onChange={handleChange} />
            </div>
            <br />
            <div className="form-group">
              <label>Ciudad</label>
              <input type="text" className="form-control" name="city" placeholder="Ciudad" onChange={handleChange} required />
            </div>
            <br />
            <button type="submit" className="btn btn-black">Registrarse</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Login;
