import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../../Constants/Constants";
import axios from "axios";
import { Input, Select, Option, Typography } from "@material-tailwind/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./Auth.css";

function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
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

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Actualizar el campo de contraseña en el estado de userData
    setUserData((prevUserData) => ({
      ...prevUserData,
      password: newPassword,
    }));

    // Expresión regular para validar una contraseña segura
    const strongPasswordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(newPassword)) {
      setPasswordError(
        <Typography
          variant="small"
          color="black"
          className="mt-2 flex gap-1 font-normal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-mt-px h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          La contraseña debe tener al menos 8 caracteres, incluyendo al menos
          una letra, un número y un carácter especial.
        </Typography>
      );
    } else {
      setPasswordError("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    setUsername("");
    setPassword("");
    setPasswordError("");
    setShowPassword(false);
  };

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
    // Resetear el formulario de registro
    setUserData({
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
    setShowPassword(false);
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

    // Verificar si hay un error en la contraseña
    if (passwordError) {
      Swal.fire({
        icon: "error",
        title: "Contraseña no válida",
        text: "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra, un número y un carácter especial.",
      });
      return; // Salir de la función si la contraseña no es válida
    }

    // Verificar si todos los campos requeridos están llenos
    const requiredFields = [
      "username",
      "name",
      "firstSurname",
      "email",
      "password",
      "confirmPassword",
      "city",
    ];
    const missingFields = requiredFields.filter((field) => !userData[field]);

    if (missingFields.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Campos faltantes",
        text: `Por favor, complete los campos ${missingFields.join(", ")}`,
      });
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
      });
      return; // Salir de la función si las contraseñas no coinciden
    }

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

  const handleRegisterFormChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="background container-fluid">
      <div className="row justify-content-center align-items-start vh-100">
        <div className="col-md-6">
          <div className="sidenav text-center">
            <div className="login-main-text d-flex flex-column align-items-center">
              <img
                src="/img/helen-letras.gif"
                alt="logo"
                style={{ width: "150px", marginTop: "50px" }}
              />
              <h2
                className="pb-2 font-medium"
                style={{ color: "#fff", fontSize: 25 }}
              >
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
        <Modal.Header>
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
                maxLength={20}
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
                  maxLength={30}
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
      <Modal
        show={showRegisterModal}
        onHide={toggleRegisterModal}
        centered
        size="xl"
      >
        <Modal.Header>
          <Modal.Title className="mx-auto">Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleRegister} name="register">
                <div className="">
                  <Input
                    type="text"
                    id="username"
                    maxLength={20}
                    label="Usuario"
                    value={userData.username}
                    name="username"
                    onChange={handleRegisterFormChange}
                    required
                  />
                </div>
                <br />
                <div className="">
                  <Input
                    type="text"
                    id="name"
                    label="Nombre"
                    maxLength={20}
                    value={userData.name}
                    name="name"
                    onChange={handleRegisterFormChange}
                    required
                  />
                </div>
                <br />
                <div className="">
                  <Input
                    type="text"
                    id="firstSurname"
                    maxLength={20}
                    label="Primer Apellido"
                    value={userData.firstSurname}
                    name="firstSurname"
                    onChange={handleRegisterFormChange}
                    required
                  />
                </div>
                <br />
                <div className="">
                  <Input
                    type="text"
                    id="secondSurname"
                    maxLength={20}
                    label="Segundo Apellido"
                    value={userData.secondSurname}
                    name="secondSurname"
                    onChange={handleRegisterFormChange}
                  />
                </div>
                <br />
                <div className="">
                  <Input
                    type="email"
                    id="email"
                    label="Correo electrónico"
                    value={userData.email}
                    name="email"
                    onChange={handleRegisterFormChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <form onSubmit={handleRegister}>
                <div className="">
                  <Select
                    variant="standard"
                    label="Género"
                    name="gender"
                    onChange={(value) =>
                      handleRegisterFormChange({
                        target: { name: "gender", value },
                      })
                    }
                    required
                  >
                    <Option value="1">Masculino</Option>
                    <Option value="2">Femenino</Option>
                  </Select>
                </div>
                <br />
                <div className="">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    maxLength={30}
                    label="Contraseña"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    error={passwordError ? true : false}
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
                  {passwordError}
                </div>

                <br />
                <div className="">
                  <Input
                    type={"password"}
                    id="confirmPassword"
                    maxLength={30}
                    label="Confirmar Contraseña"
                    value={userData.confirmPassword}
                    name="confirmPassword"
                    onChange={handleRegisterFormChange}
                    required
                  />
                </div>
                <br />
                <div className="">
                  <Input
                    type="tel"
                    id="phoneNumber"
                    label="Número de teléfono"
                    value={userData.phoneNumber}
                    name="phoneNumber"
                    onChange={handleRegisterFormChange}
                  />
                </div>
                <br />
                <div className="">
                  <Input
                    type="text"
                    id="city"
                    maxLength={20}
                    label="Ciudad"
                    value={userData.city}
                    name="city"
                    onChange={handleRegisterFormChange}
                    required
                  />
                </div>
                <br />
              </form>
            </div>
          </div>
          <div className="text-center mt-4">
            <form onSubmit={handleRegister} name="register">
              <button
                type="submit"
                className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
              >
                Registrarse
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default Auth;
