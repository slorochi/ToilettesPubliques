//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


import "./NavBar.css";

import React from 'react';

import { NavLink } from 'react-router-dom';




export default function NavBar() {


  return (

    <Navbar style={{marginBottom:25,padding:0}}className="navbar justify-center items-center flex" expand="lg" variant="tabs" defaultActiveKey="/">
      <Container  className=" justify-content-center" fluid  >
        <Navbar.Toggle className="burgermenu" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Container className=" justify-content-center">
            <Nav
              className="me-auto my-4 my-lg-0 no-decoration"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavLink style={{fontWeight:600,fontSize:20}} className={({ isActive }) => (isActive ? "active" : "navLink")} to="/">
                <Nav.Link className="navbar-link" style={{fontWeight:600,fontSize:20}}href="/">Accueil</Nav.Link>
              </NavLink>
              <NavLink style={{fontWeight:600,fontSize:20, }} className={({ isActive }) => (isActive ? "active" : "navLink")} to="/recherche" >
                <Nav.Link className="navbar-link" style={{fontWeight:600,fontSize:20}} href="/recherche">Recherche</Nav.Link>
              </NavLink>
            </Nav>
          </Container>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}