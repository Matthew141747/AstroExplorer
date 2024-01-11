import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../styles/Navigate.css';
import axios from 'axios'; 

const Navigate = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check login status when the component mounts
    checkLoginStatus();
  }, []);


  const checkLoginStatus = async () => {
    try {
      // Make a request to the backend to check the login status
      const response = await axios.get('http://localhost:5000/api/check-login', { withCredentials: true });

      // If the backend indicates that the user is logged in, update the state
      if (response.data.loggedIn) {
        setIsLoggedIn(true);
        setUserName(response.data.username);
      }
    } catch (error) {
      console.error('Error checking login status:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      // Make a request to the backend to logout
      await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });

      // Update state to reflect that the user is no longer logged in
      setIsLoggedIn(false);
      setUserName('');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };


  return (
    <div className="navigate-container">
      <div>Logo or Branding</div>
      <ul className="navigate-links">
        <li>
          <Link to="/" className="navigate-link">
            Home
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <div className="user-info">{`Hello, ${userName}`}</div>
            </li>
            <li>
              <button onClick={handleLogout} className="navigate-link">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register" className="navigate-link">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="navigate-link">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

  export default Navigate;