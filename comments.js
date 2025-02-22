// Create web server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

let comments = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/comments", (req, res) => {
  res.status(200).json(comments);
});

app.post("/comments", (req, res) => {
  const comment = req.body.comment;
  if (comment) {
    comments.push(comment);
    res.status(201).json({ message: "Comment added successfully" });
  } else {
    res.status(400).json({ message: "Invalid comment" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
// End of comments.js