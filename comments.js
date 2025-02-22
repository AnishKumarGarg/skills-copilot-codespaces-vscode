// Create Web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const comments = require('./comments');

// Use the body-parser middleware
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === Number(req.params.id));
  res.json(comment);
});

// Create a comment
app.post('/comments', (req, res) => {
  const id = comments.length + 1;
  const newComment = {
    id,
    ...req.body
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === Number(req.params.id));
  Object.assign(comment, req.body);
  res.status(200).json(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const index = comments.findIndex(comment => comment.id === Number(req.params.id));
  comments.splice(index, 1);
  res.sendStatus(204);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});