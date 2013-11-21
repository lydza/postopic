
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

app.get('/topics',  function(req, res){
  Topic.find().sort({date: 'asc'}).exec(function(err, results){
    if(err){
      console.log('There was an error finding the topics.');
      res.redirect('/');
      return;
    } else{
      console.log('Found ' + results.length + ' topics.');
      res.render('topics', {
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
      console.log('Found ' + results.length + ' posts.');
      res.render('posts', {
        posts: results
      });
    }
  })
});

app.get('/topic/:id',  function(req, res){
  console.log('Looking in the database for the topic: ' + req.params.id + '...');
  Topic.find().where('_id', req.params.id).exec(function(err, topicResults){
    if(err){
      console.log('There was an error finding the topics.');
      res.redirect('/');
      return;
    } else{
      console.log('Found the topic. It has the length '+ topicResults.length +'. Now looking in the database for the a posts with that topic...');
      Post.find().where('topic_id', String(req.params.id)).exec(function(err, postResults){
        if(err){
          console.log('There was an error finding the posts associated with this topic:' + err);
          res.redirect('/');
          return;
        }
        else{
          console.log('Found ' + postResults.length + ' posts with this topic.');
          res.render('topic', {
            posts: postResults,
            topic: topicResults[0]
          });
        }
      });
    }
  })
});

app.get('/post/:id',  function(req, res){
  Post.find().where('_id', req.params.id).sort({date: 'asc'}).exec(function(err, results){
    if(err){
      console.log('There was an error finding the posts.');
      res.redirect('/');
      return;
    } else{
      console.log('Found the post with this ID.\n' + results);
      res.render('post', {
        post: results
      });
    }
  })
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
