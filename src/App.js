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
import ProtectedRoute from "./Components/Auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/*Rutas protegidas*/}
          <Route element={<ProtectedRoute/>}>
            <Route
              path="/users"
              element={
                <div className="d-flex">
                  <Sidebar />
                  <Container fluid className="content">
                    <Users />
                  </Container>
                </div>
              }
            />
            <Route
              path="/user"
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
              path="/"
              element={
                <div className="d-flex">
                  <Sidebar />
                  <Container fluid className="content">
                    <Publications />
                  </Container>
                </div>
              }
            />
            <Route
              path="/add"
              element={
                <div className="d-flex">
                  <Sidebar />
                  <Container fluid className="content">
                    <AddPublications />
                  </Container>
                </div>
              }
            />
            <Route
              path="/top"
              element={
                <div className="d-flex">
                  <Sidebar />
                  <Container fluid className="content">
                    <TopPublications />
                  </Container>
                </div>
              }
            />
          </Route>
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;