import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Sidebar from "./Components/Sidebar/Sidebar";
import Users from "./Components/Users/Users";
import User from "./Components/Users/User";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Logout from "./Components/Auth/Logout";
import TopPublications from "./Components/Publications/TopPublications";
import AddPublications from "./Components/Publications/AddPublications";
import Publications from "./Components/Publications/Publications";
import NotFound from "./Components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        {/* Colocar ToastContainer fuera de las rutas */}
        <ToastContainer />
        
        {/* Definir Sidebar solo para las rutas que lo necesitan */}
        <Routes>
          <Route path="*" element={<NotFound/>}></Route>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user/*"
            element={
              <div className="d-flex">
                <Sidebar />
                <Container fluid className="content">
                  <User />
                </Container>
              </div>
            }
          />
          <Route
            path="/users/*"
            element={
              <div className="d-flex">
                <Sidebar />
                <Container fluid className="content">
                  <Users />
                </Container>
              </div>
            }
          />
          {/* Agrupar las rutas de publicaciones */}
          <Route
            path="/publications/*"
            element={
              <div className="d-flex">
                <Sidebar />
                <Container fluid className="content">
                  <Routes>
                    <Route path="/" element={<Publications />} />
                    <Route path="/add" element={<AddPublications />} />
                    <Route path="/top" element={<TopPublications />} />
                  </Routes>
                </Container>
              </div>
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
