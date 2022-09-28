import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import MainPage from './MainPage';

export default function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}
