import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Components/Sidebar/Sidebar";
import Users from "./Components/Users/Users";
import Publications from "./Components/Publications/Publications";
import User from "./Components/Users/User";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Logout from "./Components/Auth/Logout";
import TopPublications from "./Components/Publications/TopPublications";
import AddPublications from "./Components/Publications/AddPublications";
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex" >
        <Sidebar />
        <Container fluid className="content">
          <Routes>
            <Route path="/" element={<Publications />} />
            <Route path="/user" element={<User />} />
            <Route path="/users" element={<Users />} />
            <Route path="/topPublications" element={<TopPublications />} />
            <Route path="/addPublications" element={<AddPublications />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
