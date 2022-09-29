import React from 'react';
import {
  Button,
  Container, Form, FormControl, Navbar, NavLink, Nav, NavDropdown,
} from 'react-bootstrap';
// import '../../public/style.css';

import Registration from './Registration';

export default function Header() {
  return (
    <Navbar expand="lg" bg="success" variant="dark">
      <Container className="justify-content-space-between">
        <Navbar.Brand href="/">
          Biking
        </Navbar.Brand>
        <span>Привет, гость!</span>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="menu">
          <Nav>
            <NavDropdown
              title="Меню"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/auth/auth">Home</NavDropdown.Item>
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
