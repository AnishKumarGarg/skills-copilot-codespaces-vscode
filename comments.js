// Create Web server
// npm install express
// npm install body-parser
// npm install ejs
// npm install mongoose
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var mongoose = require('mongoose');
var app = express();
var port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/Comments');

// Create a schema
var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Create a model
var Comment = mongoose.model('Comment', commentSchema);

// Set view engine
app.set('view engine', 'ejs');

// Use body-parser
app.use(bodyParser.urlencoded({extended: true}));

// Get all comments
app.get('/', function(req, res) {
    Comment.find({}, function(err, comments) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {comments: comments});
        }
    });
});

// Post a comment
app.post('/comment', function(req, res) {
    var newComment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });

    newComment.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.listen(port, function() {
    console.log('Server is running on port ' + port);
});