
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
    console.log('Succecsfully added to database~!');
    res.redirect('/');
  });
});

app.get('/topic',  function(req, res){
  res.render('', {});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
