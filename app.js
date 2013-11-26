/******************************************************************************
 *
 * Variables
 *
 *****************************************************************************/
 
// Came with Express

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

// For Routing

var post = require('./routes/post');
var topic = require('./routes/topic');
var index = require('./routes/index');

// Helpers

var async = require('async');

// Models

var Post = require('./models/Post.js');
var Topic = require('./models/Topic.js');

// Database Connection

var db = require('./db.js');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connected to database.');
});

// Info to Pass to Routes

var routerData = {
  database: {
    model: {
      post: Post,
      topic: Topic
    }
  },
  helper: {
    async: async
  }
};

/******************************************************************************
 *
 * Middleware
 *
 *****************************************************************************/
 
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

/******************************************************************************
 *
 * Routes
 *
 *****************************************************************************/

app.get('/', index.render(routerData));
app.get('/error', index.error);

app.get('/topics', topic.all(routerData));
app.get('/topic/:id', topic.id(routerData));
app.post('/topic/create', topic.create(routerData));
app.del('/topic/:id', topic.id.del(routerData));
app.del('/topics', topic.all.del(routerData));
app.put('/topic/:id', topic.id.update(routerData));

app.get('/posts', post.all(routerData));
app.get('/post/:id', post.id(routerData));
app.post('/post/create', post.create(routerData));
app.del('/post/:id', post.id.del(routerData));
app.del('/posts', post.all.del(routerData));
app.post('/post/:id', post.id.update(routerData));

/******************************************************************************
 *
 * Start the server!
 *
 *****************************************************************************/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
