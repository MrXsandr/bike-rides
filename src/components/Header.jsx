import React from 'react';
import {
  Button,
  Container, Form, FormControl, Navbar, NavLink, Nav, NavDropdown,
} from 'react-bootstrap';

import Registration from './Registration';

export default function Header({ currUser, logOutHandler }) {
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Navbar.Brand href="/">
          Велопрогулки
        </Navbar.Brand>
        {currUser.id ? (
          <Navbar.Text>
            Привет,
            {' '}
            {currUser.name}
          </Navbar.Text>
        ) : ((<Navbar.Text style={{ color: 'red' }}>Привет, гость!</Navbar.Text>))}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="container-fluid">
          <Nav>
            <NavDropdown
              title="Меню"
              id="basic-nav-dropdown"
              className="me-2 mb-2 mb-lg-0"
            >
              {currUser.id ? (
                <NavDropdown.Item>
                  <button type="submit" onClick={logOutHandler}>Выйти</button>
                  {' '}
                </NavDropdown.Item>
              ) : (
                <>
                  <NavDropdown.Item href="/authorization">Личный кабинет</NavDropdown.Item>
                  {/* <NavDropdown.Item href="/auth/registration">Зарегестрироваться</NavDropdown.Item> */}
                  <NavDropdown.Item href="/registration">Зарегестрироваться</NavDropdown.Item>
                </>
              )}
              {/* <NavDropdown.Item href="/auth/authorization">Контакты</NavDropdown.Item> */}
              <NavDropdown.Item href="/contacts">Контакты</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}
