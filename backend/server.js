
require('dotenv').config();
const path = require('path');
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => res.redirect('/login.html'));


app.post('/api/signup', (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existing) {
    return res.status(409).json({ success: false, message: 'Username already exists.' });
  }
  const hashed = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO users (name, username, password) VALUES (?, ?, ?)').run(name, username, hashed);
  res.json({ success: true, message: 'Account created!' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ success: false, message: 'Invalid username or password.' });
  }
  res.json({ success: true, message: `Welcome back, ${user.name}!` });
});



app.get('/api/authors', (req, res) => {
  const authors = db.prepare('SELECT * FROM authors').all();
  res.json({ success: true, data: authors });
});

app.post('/api/authors', (req, res) => {
  const { name, nationality } = req.body;
  db.prepare('INSERT INTO authors (name, nationality) VALUES (?, ?)').run(name, nationality);
  res.json({ success: true, message: 'Author added.' });
});

app.delete('/api/authors/:id', (req, res) => {
  db.prepare('DELETE FROM authors WHERE id = ?').run(req.params.id);
  res.json({ success: true, message: 'Author deleted.' });
});



app.get('/api/genres', (req, res) => {
  const genres = db.prepare('SELECT * FROM genres').all();
  res.json({ success: true, data: genres });
});

app.post('/api/genres', (req, res) => {
  const { name, description } = req.body;
  db.prepare('INSERT INTO genres (name, description) VALUES (?, ?)').run(name, description);
  res.json({ success: true, message: 'Genre added.' });
});

app.delete('/api/genres/:id', (req, res) => {
  db.prepare('DELETE FROM genres WHERE id = ?').run(req.params.id);
  res.json({ success: true, message: 'Genre deleted.' });
});


app.get('/api/books', (req, res) => {
  const books = db.prepare('SELECT * FROM books').all();
  res.json({ success: true, data: books });
});

app.post('/api/books', (req, res) => {
  const { title, author, genre, stock, description } = req.body;
  db.prepare('INSERT INTO books (title, author, genre, stock, description) VALUES (?, ?, ?, ?, ?)')
    .run(title, author, genre, stock || 0, description);
  res.json({ success: true, message: 'Book added.' });
});

app.put('/api/books/:id', (req, res) => {
  const { title, author, genre, stock, description } = req.body;
  db.prepare('UPDATE books SET title=?, author=?, genre=?, stock=?, description=? WHERE id=?')
    .run(title, author, genre, stock, description, req.params.id);
  res.json({ success: true, message: 'Book updated.' });
});

app.delete('/api/books/:id', (req, res) => {
  db.prepare('DELETE FROM books WHERE id = ?').run(req.params.id);
  res.json({ success: true, message: 'Book deleted.' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});