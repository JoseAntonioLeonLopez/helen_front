import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import { usePostLogin } from '../../Hooks/useHooks'; 
import Swal from 'sweetalert2';
import './Auth.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { postData } = usePostLogin();
  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await postData('login', { username, password }); 
      if (response.token) {
        localStorage.setItem('token', response.token);
        // Redirigir al usuario a la página protegida después de un inicio de sesión exitoso
        navigate('/publications');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
      });
    }
  };

  return (
    <div>
      <div className="sidenav">
        <div className="login-main-text">
          <h2><img src='/img/helen-letras.gif' alt="logo"></img><br />Comparte experiencias!!</h2>
          <p>Entra o regístrate para empezar la aventura.</p>
        </div>
      </div>
      
      <div className="main d-flex justify-content-center">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            <form onSubmit={handleSubmit}>
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
              <Link to="/register" className="btn btn-secondary">Registrarse</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
