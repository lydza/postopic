'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');
var mongoose = require('mongoose');
var db = require('./db');

var post = require('./routes/post');
var topic = require('./routes/topic');
var index = require('./routes/index');

var Post = require('./models/Post.js');
var Topic = require('./models/Topic.js');

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


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

	var app = express();

	app.configure(function(){
	    app.set('port', 9000);

	    app.set('view engine', 'handlebars');
	    app.set('views', __dirname + '../app/scripts/views');
	});


	// simple log
	app.use(function(req, res, next){
	  console.log('%s %s', req.method, req.url);
	  next();
	});

	// mount static
	app.use(express.static( path.join( __dirname, '../app') ));
	app.use(express.static( path.join( __dirname, '../.tmp') ));


	// route index.html
  app.get('/api/topics', topic.all(routerData));
  app.get('/api/topics/:id', topic.id(routerData));
  app.post('/api/topics', topic.create(routerData));
  app.del('/api/topics/:id', topic.id.del(routerData));
  app.del('/api/topics', topic.all.del(routerData));
  app.put('/api/topics/:id', topic.id.update(routerData));

  app.get('/api/posts', post.all(routerData));
  app.get('/api/posts/:id', post.id(routerData));
  app.post('/api/posts', post.create(routerData));
  app.del('/api/posts/:id', post.id.del(routerData));
  app.del('/api/posts', post.all.del(routerData));
  app.put('/api/posts/:id', post.id.update(routerData));
  
  app.all('*', index.render());

	// start server
	http.createServer(app).listen(app.get('port'), function(){
	    console.log('Express App started!');
	});
});


