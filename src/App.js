import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Components/Sidebar/Sidebar";
import Users from "./Components/Users";
import Publications from "./Components/Publications";
import User from "./Components/User";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Logout from "./Components/Logout";
import TopPublications from "./Components/TopPublications";
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Publications />} />
            <Route path="/user" element={<User />} />
            <Route path="/users" element={<Users />} />
            <Route path="/topPublications" element={<TopPublications />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
