import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MainPage from './MainPage';
import Header from './Header';
import Registration from './Registration';
import Authorization from './Authorization';
import OneRoute from './OneRoute';
import NewReview from './NewReview';
import MyRoutes from './MyRoutes';
import NewRoute from './NewRoute';

export default function App({ user }) {
  const [currUser, setCurrUser] = useState(user || {});
  const logOutHandler = () => {
    fetch('/api/v1/auth/logout')
      .then(() => setCurrUser({}));
  };
  return (
    <Container>
      <Header currUser={currUser} logOutHandler={logOutHandler} />
      <Routes>
        <Route path="/" element={<MainPage currUser={currUser} />} />
        <Route path="/registration" element={<Registration setCurrUser={setCurrUser} />} />
        <Route path="/authorization" element={<Authorization setCurrUser={setCurrUser} />} />
        <Route path="/:routeId" element={<OneRoute currUser={currUser} />} />
        <Route path="/:route/newReview" element={<NewReview currUser={currUser} />} />
        <Route path="/myRoutes" element={<MyRoutes currUser={currUser} setCurrUser={setCurrUser} />} />
        <Route path="/newRoute" element={<NewRoute currUser={currUser} setCurrUser={setCurrUser} />} />
      </Routes>

    </Container>
  );
}
