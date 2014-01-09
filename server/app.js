/******************************************************************************
 *
 * Variables
 *
 *****************************************************************************/
 
// Came with Express

var express = require('express');

var http = require('http');
var path = require('path');

// For Routing

var post = require('./routes/post');
var topic = require('./routes/topic');
var index = require('./routes/index');

// Helpers

var async = require('async');
var slug = require('slug');

// Models

var Post = require('./models/Post.js');
var Topic = require('./models/Topic.js');

// Database Connection

var db = require('./db.js');

// Info to Pass to Routes

var routerData = {
  database: {
    model: {
      post: Post,
      topic: Topic
    }
  },
  helper: {
    async: async,
    slug: slug
  }
};

/******************************************************************************
 *
 * Middleware
 *
 *****************************************************************************/
 
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'public'));
app.set('env', 'development');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '../app')));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);


// For the development environment only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/******************************************************************************
 *
 * Routes
 *
 *****************************************************************************/

app.get('/api/topics/:page', topic.all(routerData));
app.get('/api/topic/:slug', topic.slug(routerData));
app.post('/api/topics', topic.create(routerData));
app.del('/api/topic/:slug', topic.slug.del(routerData));
app.del('/api/topics', topic.all.del(routerData));
app.put('/api/topic/:slug', topic.slug.update(routerData));

app.get('/api/posts/:page', post.all(routerData));
app.get('/api/post/:slug', post.slug(routerData));
app.post('/api/post', post.create(routerData));
app.del('/api/post/:slug', post.slug.del(routerData));
app.del('/api/posts', post.all.del(routerData));
app.put('/api/post/:slug', post.slug.update(routerData));

app.all('*', index.render());

/******************************************************************************
 *
 * Start the server!
 *
 *****************************************************************************/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
