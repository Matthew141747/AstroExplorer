import React, { useState} from "react";
import '../styles/RegistrationPage.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    
    const bcrypt = require('bcryptjs');
    const saltRounds = 10; // Number of salt rounds for bcrypt
    
    const handleRegister = async () => {

        if (!username || !password || !verifyPassword || !email || !dateOfBirth) {
            alert('Please fill in all fields.');
            return;
          }

        // Check if passwords match
        if (password !== verifyPassword) {
          console.error("Passwords do not match");
          return;
        }
      
        try {
          // Hash the password before storing it
          //Remember to move hashing functionality to the backend 
         const hashedPassword = await bcrypt.hash(password, saltRounds);
      
          const response = await axios.post('http://localhost:5000/api/register', {
            username,
            password: hashedPassword,
            //password,
            email,
            dateOfBirth,
          });
      
          console.log('Registration successful:', response.data);
       
        } catch (error) {
          console.error('Registration failed:', error.message);
    
        }
      };
      
    return (
        <div className="registration-container">
          <div className="registration-form">
            <h2>Register An Account</h2>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
    
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
    
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
    
            <div className="input-group">
              <label htmlFor="verifyPassword">Verify Password:</label>
              <input
                type="password"
                id="verifyPassword"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
              />
            </div>
    
            <div className="input-group">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <DatePicker
                id="dateOfBirth"
                selected={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                placeholderText="Select Date"
                />
            </div>
    
            <button onClick={handleRegister}>Register</button>
          </div>
        </div>
      );
  };
  
  export default RegistrationPage;