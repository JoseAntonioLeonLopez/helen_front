import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../../Constants/Constants";
import axios from "axios";
import { Input, Select, Option } from "@material-tailwind/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
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
              <h2 className="pb-2" style={{ color: "#fff", fontSize: 25 }}>
                ¡Comparte experiencias!
              </h2>
              <div className="row mt-3">
                <div className="col-md-6">
                  <button
                    type="button"
                    className="d-inline-block rounded bg-neutral-50 px-7 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] text-nowrap"
                    onClick={toggleLoginModal}
                  >
                    {" "}
                    Iniciar Sesión
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    type="button"
                    className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                    onClick={toggleRegisterModal}
                  >
                    Registrarse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para iniciar sesión */}
      <Modal show={showLoginModal} onHide={toggleLoginModal} centered>
        <Modal.Header closebutton>
          <Modal.Title className="mx-auto">Iniciar Sesión</Modal.Title>
          {/* Usar la clase 'mx-auto' */}
        </Modal.Header>
        <Modal.Body className="text-center">
          {/* Mantener la clase 'text-center' para el contenido */}
          <form onSubmit={handleLogin} className="d-inline-block mx-auto">
            <div className="w-72">
              <Input
                type="text"
                id="username"
                label="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <br />
            <div className="w-72">
              <div className="input-group ">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  label="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  icon={
                    <i onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </i>
                  }
                />
              </div>
            </div>
            <br />
            <button
              type="submit"
              className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
            >
              Entrar
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal para registrarse */}
      <Modal show={showRegisterModal} onHide={toggleRegisterModal} centered>
  <Modal.Header closebutton>
    <Modal.Title className="mx-auto">Registrarse</Modal.Title>
  </Modal.Header>
  <Modal.Body className="text-center">
    <div className="row">
      <div className="col-md-6">
        <form onSubmit={handleRegister}>
          <div className="w-72">
            <Input
              type="text"
              id="username"
              label="Usuario"
              value={userData.username}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <br />
          <div className="w-72">
            <Input
              type="text"
              id="name"
              label="Nombre"
              value={userData.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <br />
          <div className="w-72">
            <Input
              type="text"
              id="firstSurname"
              label="Primer Apellido"
              value={userData.firstSurname}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <br />
          <div className="w-72">
            <Input
              type="text"
              id="secondSurname"
              label="Segundo Apellido"
              value={userData.secondSurname}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          <div className="w-72">
            <Input
              type="email"
              id="email"
              label="Correo electrónico"
              value={userData.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </form>
      </div>
      <div className="col-md-6">
        <form onSubmit={handleRegister}>
        <div className="form-group">
        <Select
              label="Género"
              name="gender"
              onChange={handleChange}
              required
            >
              <Option value="1">Masculino</Option>
              <Option value="2">Femenino</Option>
            </Select>
          </div>
          <br/>
          <div className="w-72">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              label="Contraseña"
              value={userData.password}
              onChange={(e) => handleChange(e)}
              required
              icon={
                <i onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </i>
              }
            />
          </div>
          <br />
          <div className="w-72">
            <Input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              label="Confirmar Contraseña"
              value={userData.confirmPassword}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <br />
          <div className="w-72">
            <Input
              type="text"
              id="phoneNumber"
              label="Número de teléfono"
              value={userData.phoneNumber}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          <div className="w-72">
            <Input
              type="text"
              id="city"
              label="Ciudad"
              value={userData.city}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <br />
          <button type="submit" className="btn btn-black">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  </Modal.Body>
</Modal>

    </div>
  );
}

export default Login;
