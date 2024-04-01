import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom
import './Auth.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario al backend
    console.log('Email:', email);
    console.log('Password:', password);
    // Redireccionar a la página de publicaciones después de hacer clic en "Entrar"
    window.location.href = '/publications';
  };

  return (
    <div>
      <div className="sidenav">
        <div className="login-main-text">
          <h2><img src='/img/helen.svg' alt="logo"></img><br />Comparte experiencias!!</h2>
          <p>Entra o regístrate para empezar la aventura.</p>
        </div>
      </div>
      <div className="main d-flex justify-content-center">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Correo electrónico</label>
                <input type="email" className="form-control" placeholder="Correo electrónico" />
              </div>
              <br />
              <div className="form-group">
                <label>Contraseña</label>
                <div className="input-group">
                  <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Contraseña" />
                  <div className="input-group-append">
                    <button className="eye btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                      {showPassword ? 
                        <img src="/img/eye-show.png" alt="Ocultar contraseña" /> : 
                        <img src="/img/eye-hide.png" alt="Mostrar contraseña" />
                      }
                    </button>
                  </div>
                </div>
              </div>
              <br />
              <Button type="submit" className="btn btn-black">Entrar</Button>
              <Link to="/register" className="btn btn-secondary">Registrarse</Link> {/* Enlace a la página de registro */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
