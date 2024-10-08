const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const mysql = require('mysql2');
require('dotenv').config();


app.use(bodyParser.json());

const corsOptions = {
    origin: 'https://villanova-nsbe.netlify.app', 
    methods: ['GET', 'POST'], 
   
  };
  
app.use(cors(corsOptions)); // Apply CORS middleware

let events = [];

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'events_db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'nova' && password === 'nsbe') {
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});


app.post('/api/events', (req, res) => {
  console.log('Received body:', req.body); 
  const { title, day_of_week, time_of_day } = req.body;

  if (!title || !day_of_week || !time_of_day) {
      console.log('Missing fields:', { title, day_of_week, time_of_day });
      return res.status(400).send({ message: 'Please fill all fields' });
  }

  const sql = 'INSERT INTO events (title, day_of_week, time_of_day) VALUES (?, ?, ?)';
  db.query(sql, [title, day_of_week, time_of_day], (err, result) => {
      if (err) {
          console.log('Database error', err);
          return res.status(500).send({ message: 'Failed to add event' });
      }
      res.status(201).send({ message: 'Event added successfully!', event: { id: result.insertId, title, day_of_week, time_of_day } });
  });
});

app.get('/api/events', (req,res) => {
  const sql = 'SELECT * FROM events';
  db.query(sql, (err,results) => {
    if (err) {
      return res.status(500).send({ message: "Failed to fetch events"});

    }
    res.status(200).send(results)
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
