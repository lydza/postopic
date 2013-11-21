
/**
 * Module dependencies.
 */

// Default variables that came with Express

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var post = require('./routes/post');
var topic = require('./routes/topic');
var index = require('./routes/index');

// Models

var Post = require('./models/Post.js');
var Topic = require('./models/Topic.js');

// Database Connections

var db = require('./db.js');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connected to database.');
});

// Holds the database info for the routes.
var database = {
  info: {
    database: db,
    models: {
      post: Post,
      topic: Topic
    }
  }
};

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

app.get('/', index.render(database.info));
app.post('/topic/create', topic.create(database.info));
app.post('/post/create', post.create(database.info));
app.get('/topics', topic.all(database.info));
app.get('/posts', post.all(database.info));
app.get('/topic/:id', topic.id(database.info));
app.get('/post/:id', post.id(database.info));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
