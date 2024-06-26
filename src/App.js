import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Sidebar from "./Components/Sidebar/Sidebar";
import Users from "./Pages/Users/Users";
import User from "./Pages/Users/User";
import Auth from "./Pages/Auth/Auth";
import Logout from "./Pages/Auth/Logout";
import Publications from "./Pages/Publications/Publications";
import TopPublications from "./Pages/Publications/TopPublications";
import NotFound from "./Pages/404/NotFound";
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
          <Route path="/auth" element={<Auth />} />

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