const path = require('path');
const express = require('express');

const app = express();

// Connect database
const db = require('./connect2db.js');

// Set EJS view engine
app.set('view engine', 'ejs');

// Set views directory
app.set('views', path.join(__dirname, 'views'));

// -----------------------------------
// Sample users
// -----------------------------------
const users = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'Coach' },
  { id: 3, name: 'Charlie', role: 'Member' },
  { id: 4, name: 'David', role: 'Member' },
  { id: 5, name: 'Emma', role: 'Coach' }
];

// -----------------------------------
// Route 1 - Home
// -----------------------------------
app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1>');
});

// -----------------------------------
// Route 2 - Dashboard
// -----------------------------------
app.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard'
  });
});

// -----------------------------------
// Route 3 - Users list
// -----------------------------------
app.get('/users', (req, res) => {
  res.render('users', {
    users
  });
});

// -----------------------------------
// Route 4 - Single user
// -----------------------------------
app.get('/users/:id', (req, res) => {
  const user = users.find(
    u => u.id === parseInt(req.params.id)
  );

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.render('profile', {
    user
  });
});

// -----------------------------------
// Route 5 - About
// -----------------------------------
app.get('/about', (req, res) => {
  res.render('about');
});

// -----------------------------------
// Start server
// -----------------------------------
app.listen(8050, () => {
  console.log('Server running on port 8050');
});