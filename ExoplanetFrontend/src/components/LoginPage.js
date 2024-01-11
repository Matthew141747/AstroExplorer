import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import jwt from 'jsonwebtoken';
import '../styles/LoginPage.css';
//import jwt from 'jsonwebtoken/dist/jsonwebtoken.browser.js';


const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const handleLogin = async () => {
    // Basic form validation
    if (!identifier || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', 
      { identifier, password },
      { withCredentials: true });

      // Handle successful login
      console.log(response.data);

      navigate('/');
    } catch (error) {
      // Handle login failure
      console.error('Login failed:', error.message);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <label htmlFor="identifier">Username or Email:</label>
        <input
          type="text"
          id="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;