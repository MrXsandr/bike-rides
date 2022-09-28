import React from 'react';
import {
  Button,
  Container, Form, FormControl, Navbar, NavLink, Nav,
} from 'react-bootstrap';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';

export default function Header() {
  return (
    <>
      <Navbar sticky="top" collapseOnSelect expand="nd" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              height="30"
              width="30"
              className="d-inline-block align-top"
              alt="logo"
            />
            {' '}
            First Site
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavLink href="/">Home </NavLink>
              <NavLink href="/about">About us </NavLink>
              <NavLink href="/contacts">Contacts </NavLink>
              <NavLink href="/blog">Blog </NavLink>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contacts" element={<Contacts />} />
          <Route exact path="/blog" element={<Blog />} />
        </Routes>
      </Router>

    </>
  );
}
