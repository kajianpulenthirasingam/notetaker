// Import necessary modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define your routes here
// GET /api/notes
app.get('/api/notes', (req, res) => {
  // Read db.json and send notes as JSON
});

// POST /api/notes
app.post('/api/notes', (req, res) => {
  // Receive new note, generate unique ID, save to db.json, and send the new note as response
});

// DELETE /api/notes/:id (Bonus)
app.delete('/api/notes/:id', (req, res) => {
  // Receive ID parameter, delete corresponding note from db.json, and send a response
});
// GET /notes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// GET *
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
