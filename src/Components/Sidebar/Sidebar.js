import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className='sidebar mt-3'>
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link as={Link} to={"/"} className="pb-2">Inicio</Nav.Link>
        <div className="border-right border-dark my-1"></div>
        <Nav.Link as={Link} to={"/users"} className="pb-2">Explorar</Nav.Link>
        <div className="border-right border-dark my-1"></div>
        <Nav.Link as={Link} to={"/topPublications"} className="pb-2">Mejores fotos</Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;
