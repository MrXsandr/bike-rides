import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import MainPage from './MainPage';
import Header from './Header';

export default function App() {
  return (
    <div className="container">
      <Header />
    </div>
  );
}
