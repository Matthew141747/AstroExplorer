
import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navigate from './components/Navigate';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
const App = () => {
  return (
    <Router>
      <Navigate />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};


export default App;
