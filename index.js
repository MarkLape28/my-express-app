const express = require('express');
const app = express();
const port = 3000;

// Middleware to serve static files from "public" folder
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// Define route for the home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define route for About page
app.get('/about', (req, res) => {
  res.send('About Us');
});

// Handle POST request for form submission
app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields: name and email' });
  }

  res.json({ message: 'Received successfully', data: { name, email } });
});

// Items array to store submitted items
const items = ['Apple', 'Banana', 'Orange'];

// Route to fetch all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Route to add a new item
app.post('/items', (req, res) => {
  const newItem = req.body.item;

  if (!newItem || typeof newItem !== 'string' || newItem.trim() === '') {
    return res.status(400).json({ error: 'Invalid item input' });
  }

  items.push(newItem.trim());
  res.status(201).json({ message: 'Item added successfully', items });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Logs the error in the console
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
