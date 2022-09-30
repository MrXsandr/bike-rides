import React, { useState, useEffect, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MainPage from './MainPage';
import Header from './Header';
import Registration from './Registration';
import Authorization from './Authorization';
import Reviews from './Reviews';
import OneRoute from './OneRoute';
import NewReview from './NewReview';

export default function App({ user }) {
  const [currUser, setCurrUser] = useState(user || {});
  const logOutHandler = () => {
    fetch('/api/v1/auth/logout')
      .then(() => setCurrUser({}));
  };
  // const UserContext = createContext(currUser);
  return (
    <Container>
      {/* <UserContext.Provider> */}
      <Header currUser={currUser} logOutHandler={logOutHandler} />
      <Routes>
        <Route path="/" element={<MainPage currUser={currUser} />} />
        <Route path="/registration" element={<Registration setCurrUser={setCurrUser} />} />
        <Route path="/authorization" element={<Authorization setCurrUser={setCurrUser} />} />
        <Route path="/:routeId" element={<OneRoute currUser={currUser} />} />
        <Route path="/:route/newReview" element={<NewReview currUser={currUser} />} />
      </Routes>
      {/* </UserContext.Provider> */}

    </Container>
  );
}
