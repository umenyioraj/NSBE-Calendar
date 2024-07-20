const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow these HTTP methods
    // Add other CORS options as needed
  };
  
app.use(cors(corsOptions)); // Apply CORS middleware

let events = [];


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'nova' && password === 'nsbe') {
    res.status(200).send({ message: 'Login successful' });
    throw new Error('Login failed');
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
    alert('Login incorrect')
  }
});


app.post('/api/events', (req, res) => {
    const { title, date, time} = req.body;

    if(!title || !date || !time) {
        return res.status(400).send({message: 'Please fill all fields'});

    }
    const newEvent = {
                    title:title,
                    date: date,
                    time: time,
                };
    events.push(newEvent);

    res.status(201).send({message: 'Event added successfully!', event: newEvent});

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
