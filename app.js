
/**
 * Module dependencies.
 */

// Default variables that came with Express

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

// Models

var Post = require('./models/Post.js');
var Topic = require('./models/Topic.js');

// Database Connections

var db = require('./db.js');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connected to database.');
});

// For all environments

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('env', 'development');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// For the development environment only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Routes for this application
app.get('/', function(req, res){
  res.render('index', { 
    title: 'Lidza', 
    posts: function() {
      return Post.find().setOptions({sort: date});
    },
    topics: function() {
      return Topic.find().setOptions({sort: name});
    }
  });
});
app.post('/topic/create',function(req, res){
  var topic = new Topic({
    name: req.body.name,
    author: req.body.author,
    date: Date.now(),
  });
  topic.save(function (err, newTopic) {
    if (err) {
      console.log('There was an error saving this new topic to the database.');
      res.redirect('/');
      return;
    }
    newTopic.onCreate();
    console.log('Succecsfully added a new topic to database.');
    res.redirect('/');
  });
});


app.post('/post/create',function(req, res){
  var post = new Post({
    name: req.body.name,
    author: req.body.author,
    text: req.body.text,
    date: Date.now(),
  });
  post.save(function (err, newPost) {
    if (err) {
      console.log('There was an error saving this new post to the database.');
      res.redirect('/');
      return;
    }
    newPost.onCreate();
    console.log('Succecsfully added a new post to database.');
    res.redirect('/');
  });
});

app.get('/topic',  function(req, res){
  Topic.find().sort({date: 'asc'}).exec(function(err, results){
    if(err){
      console.log('There was an error finding the topics.');
      res.redirect('/');
      return;
    } else{
      console.log(results);
      res.render('topic', {
        topics: results
      });
    }
  })
});

app.get('/posts',  function(req, res){
  Post.find().sort({date: 'asc'}).exec(function(err, results){
    if(err){
      console.log('There was an error finding the posts.');
      res.redirect('/');
      return;
    } else{
      console.log(results);
      res.render('post', {
        posts: results
      });
    }
  })
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
