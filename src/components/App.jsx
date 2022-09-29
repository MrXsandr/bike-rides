import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MainPage from './MainPage';
import Header from './Header';
import Registration from './Registration';
import Authorization from './Authorization';
import PersonalPage from './PersonalPage';

export default function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/auth" element={<PersonalPage />} />
        <Route path="/auth/registration" element={<Registration />} />
        <Route path="/auth/authorization" element={<Authorization />} />
      </Routes>
    </Container>
  );
}
