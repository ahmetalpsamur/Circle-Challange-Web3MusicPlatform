const express = require('express');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// SQLite veritabanı bağlantısı
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);
});

app.post('/initialize-user', async (req, res) => {
  const idempotencyKey = uuidv4();

  const options = {
    method: 'POST',
    url: 'https://api.circle.com/v1/w3s/user/initialize',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      'X-User-Token': `${process.env.REACT_APP_USER_TOKEN}`,
    },
    data: { idempotencyKey: idempotencyKey, blockchains: ["MATIC-AMOY"] },
  };

  try {
    const response = await axios.request(options);
    res.json({ challengeId: response.data.data.challengeId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error initializing user');
  }
});

// Kullanıcı Kayıt API'si
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
      if (err) {
        return res.status(400).json({ error: 'User already exists' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Kullanıcı Giriş API'si
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  });
});
// Kullanıcı Profil API'si
app.get('/api/profile', (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  db.get(`SELECT username FROM users WHERE username = ?`, [username], (err, user) => {
    if (err) {
      console.error('Database error:', err); // Hata mesajını konsola yazdırın
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
