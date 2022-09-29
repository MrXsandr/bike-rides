import React from 'react';
import {
  Button,
  Container, Form, FormControl, Navbar, NavLink, Nav, NavDropdown,
} from 'react-bootstrap';

import Registration from './Registration';

export default function Header() {
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          Biking
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="container-fluid">
          <Nav style={{ justifyContent: 'space-between' }}>
            <NavDropdown
              title="Меню"
              id="basic-nav-dropdown"
              className="me-2 mb-2 mb-lg-0"
            >
              <NavDropdown.Item href="#action/3.1">Home</NavDropdown.Item>
              <NavDropdown.Item href="/auth/registration">
                Личный кабинет
              </NavDropdown.Item>
              <NavDropdown.Item href="/auth/authorization">Контакты</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
