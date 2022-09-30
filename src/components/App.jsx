import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MainPage from './MainPage';
import Header from './Header';
import Registration from './Registration';
import Authorization from './Authorization';
import MapCard from './MapCard';
import MapCardAdd from './MapCardAdd';

export default function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/map" element={<MapCard />} />
        <Route path="/addmap" element={<MapCardAdd />} />
        <Route path="/auth/registration" element={<Registration />} />
        <Route path="/auth/authorization" element={<Authorization />} />
      </Routes>
    </Container>
  );
}
