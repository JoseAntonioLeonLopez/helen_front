import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios"; // Importar axios para realizar la solicitud de registro
import { API_URL } from "../../Service/constants"; // Importar la constante API_URL
import "./Auth.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: null,
    name: null,
    firstSurname: null,
    secondSurname: null,
    gender: 1,
    email: null,
    password: null,
    confirmPassword: null,
    phoneNumber: null,
    imageUser: null,
    city: null,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Comparar contraseña y confirmación de contraseña
    if (userData.password !== userData.confirmPassword) {
      console.error(
        "La contraseña y la confirmación de la contraseña no coinciden"
      );
      return;
    }

    try {
      const response = await axios.post(API_URL + "/register", userData); // Realizar la solicitud de registro utilizando axios y la constante API_URL
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Guardar el token en el almacenamiento local
      }
      // Redireccionar a la página de publicaciones después de registrar al usuario
      navigate("/publications");
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar el usuario",
      });
    }
  };

  return (
    <div>
      <div className="sidenav">
        <div className="login-main-text">
          <h2>
            <img src="/img/helen-letras.gif" alt="logo"></img>
            <br />
            ¡Comparte experiencias!
          </h2>
          <p>Entra o regístrate para empezar la aventura.</p>
        </div>
      </div>

      <div className="main d-flex justify-content-center">
        <div className="col-md-6 col-sm-12">
          <div className="register-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre de usuario</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Nombre de usuario"
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Nombre"
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label>Primer Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstSurname"
                  placeholder="Primer Apellido"
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label>Segundo Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="secondSurname"
                  placeholder="Segundo Apellido"
                  onChange={handleChange}
                />
              </div>
              <br />
              <div className="form-group">
                <label>Género</label>
                <select
                  className="form-control"
                  name="gender"
                  onChange={handleChange}
                  required
                >
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
                </select>
              </div>
              <br />
              <div className="form-group">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Correo electrónico"
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label>Contraseña</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    required
                  />
                  <div className="input-group-append">
                    <span
                      className="eye btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <img src="/img/eye-show.png" alt="Ocultar contraseña" />
                      ) : (
                        <img src="/img/eye-hide.png" alt="Mostrar contraseña" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group">
                <label>Confirmar Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label>Número de teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  placeholder="Número de teléfono"
                  onChange={handleChange}
                />
              </div>
              <br />
              <div className="form-group">
                <label>Ciudad</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  placeholder="Ciudad"
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <Button type="submit" className="btn btn-black">
                Registrarse
              </Button>
              <div className="registerLogin-link">
                <p>¿Ya tienes cuenta?</p>
                <Link to="/" className="btn btn-secondary">
                  Entrar
                </Link>
                <br />
                <br />
                <br />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
