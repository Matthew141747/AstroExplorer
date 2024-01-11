// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'exoplanet',
});

const cors = require('cors');

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
  } else {
    console.log('Connected to MySQL');
  }
});

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Use cors middleware with specific origin and credentials
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

// Registration route
app.post('/api/register', (req, res) => {
    const { username, password, email, dateOfBirth } = req.body;
  
    // Insert user into the database
    const sql = 'INSERT INTO users (username, password, email, dateOfBirth) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, password, email, dateOfBirth], (err, result) => {
      if (err) {
        console.error('Registration failed:', err.message);
        res.status(500).send('Registration failed');
      } else {
        console.log('User registered:', result);
        res.status(200).send('Registration successful');
      }
    });
  });

// Login route
app.post('/api/login', (req, res) => {
  const { identifier, password } = req.body;

  // Perform authentication
  const sql = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(sql, [identifier, identifier], (err, results) => {
    if (err) {
      console.error('Login failed:', err.message);
      res.status(500).send('Login failed');
    } else {
      if (results.length > 0) {
        const storedPassword = results[0].password;

        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, storedPassword, (bcryptError, passwordMatch) => {
          if (bcryptError) {
            console.error('Error comparing passwords:', bcryptError.message);
            res.status(500).send('Login failed');
          } else {
            if (passwordMatch) {
              console.log('Login successful');

              
              const user = { username: results[0].username };
              const token = jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });

              // Set the token as an HTTP-only cookie
              res.cookie('token', token, { httpOnly: true });

              res.status(200).send('Login successful');
            } else {
              console.error('Incorrect password');
              res.status(401).send('Incorrect password');
            }
          }
        });
      } else {
        console.error('User not found');
        res.status(404).send('User not found');
      }
    }
  });
});

// Check login status route
app.get('/api/check-login', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ loggedIn: false });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err.message);
      return res.json({ loggedIn: false });
    }

    return res.json({ loggedIn: true, username: decoded.username });
  });
});

// Logout route
app.post('/api/logout', (req, res) => {
  // Clear the token cookie to log the user out
  res.clearCookie('token');
  res.status(200).send('Logout successful');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
