/******************************************************************************
 *
 * Post routes - Holds all routes that begin with /post.
 * 
 * create    | POST   '/api/posts'        | creates a new post
 * all       | GET    '/api/posts'        | displays all posts
 * id        | GET    '/api/posts/:id'    | displays a specific post
 * all.del   | DELETE '/api/posts'        | deletes all posts
 * id.del    | DELETE '/api/posts/:id'    | deletes this specific post
 * id.update | PUT    '/api/posts/:id'    | updates a specific post
 * 
 *****************************************************************************/

module.exports.create = function(data) {

  /* Set up variables */
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  
  /* Return a request/response function */
  return function(req, res){
    console.log('\nHttp Method:   POST \nRoute:         /posts/ \nAction:        Creates a new post');

    /* Create a new Post with the variables passed into the request */
    var post = new Post({
      name: req.body.name,
      author: req.body.author,
      text: req.body.text,
      topicId: req.body.topicId,
      date: Date.now()
   
    });
    
    /* Find a topic with this ID */    
    Topic.findOne({_id: req.body.topicId}).exec(function(err, topicResult){

      /* Error handling */
      if(err){
        console.log('There was an error finding the topic associated with this post: \n' + err);
        res.json({
          error: err
        });
      } else{
      
        /* Leave if there is no Topic associated with this new post's topicId */
        if(topicResult === null){
          console.log('There is no topic associated with this post. Can\'t add it to the database.');
          res.json({
            error: 'There is no topic associated with this post. Can\'t add it to the database.'
          });
        } else {
          
          /* Save because there is an associated topic */
          post.save(function (err, newPost) {

            /* Error handling */
            if (err) {
              console.log('There was an error saving this new post to the database: ' + err);
              res.json({
                error: err
              });
              return;
            }
            console.log('Found the topic associated with this post. It\'s been saved.');
            
            /* Update the topic's dateUpdated variable */
            Topic.update({_id: req.body.topicId}, { $set: {dateUpdated: Date.now()}}).exec();
            newPost.onCreate();
            res.json(newPost);
            return;
          });
        }
      }
    });
  };
};

module.exports.all = function(data) {

  /* Set up variables */
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  
  /* Return a response function */
  return function(req, res){
    console.log('\nHttp Method:   GET \nRoute:         /posts \nAction:        Shows all posts');

    /* Find all Posts sorted in descending order by date */
    Post.find().sort({date: 'desc'}).exec(function(err, results){

      /* Error handling */
      if(err){
        console.log('There was an error finding all posts:' + err);
        res.json({
          error: err
        });
        return;
      } else{
      
        /* Map these results and look for their associated topics */
        async.map(
          results, 
          function(item, callback){
            Topic.findOne({_id: item.topicId}).exec(function(err, topic){
              
              /* Error handling */
              if(err){
                console.log('There was an error finding a topic with the ID ' + item.topicId + ':\n' + err);
                res.json({
                  error: err
                });
              } else{
                /* 'result' holds the hash that will be passed to the following function */
                var result = {
                  post: item,
                  topic: topic
                };
                return callback(null, result);
              }
            });
          }, 
          function(err, results){
            
            /* Error handling */
            if(err){
              console.log('There was an error mapping posts to their topics:\n' + err);
              res.json({
                error: err
              });
            } else{
              console.log('Found ' + results.length + ' posts and all their associated topics.');
              res.json(results);
            }
          }
        );
      }
    });
  };
};

module.exports.id = function(data) {

  /* Set up variables */
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  
  /* Return a response function */
  return function(req, res){
    console.log('\nHttp Method:   GET \nRoute:         /posts/' + req.params.id + ' \nAction:        Shows one post');
    Post.findOne({_id: req.params.id}).exec(function(err, postResult){
      
      /* Error handling */
      if(err){
        console.log('There was an error finding the post with the id' + req.params.id + ': \n' + err);
        res.json({
          error: err
        });
        return;
      } else{
      
        /* Checks to see if there is no post with this ID */
        if(postResult === null){
          console.log('There are no posts with this id.');
          res.json({
            error: 'There are no posts with this id.'
          });
          return;
        }
        console.log('Found the post with the id ' + req.params.id + '. Now looking for the topic with the id ' + postResult.topicId + ' associated with it...');
        
        /* Looks for a topic with the topicId */
        Topic.findOne({_id: postResult.topicId}).exec(function(err, topicResult){
          
          /* Error handling */
          if(err){
            console.log('There was an error finding the topic associated with this post: \n' + err);
            res.json({
              error: err
            });
          } else{
            console.log('Found the topic associated with this post.');
            res.json({
              post: postResult,
              topic: topicResult
            });
          }
        });
      }
    });
  };
};

module.exports.all.del = function(data) {

  /* Set up variables */
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  
  /* Return a response function */
  return function(req, res){
    console.log('\nHttp Method:   DELETE \nRoute:         /posts \nAction:        Deletes all posts');
    async.parallel([
      function(callback){
        Post.find({}, null, {}, callback);
      }
    ], 
    function(err, results){
      var posts = results[0];
      
      /* Error handling */
      if(err){
        console.log('There was an error getting all posts: ' + err);
        res.json({
          error: err
        });
      } else{
        if(posts.length === 0){
          console.log('There are no posts to delete.');
          res.json({
            error: 'There are no posts to delete'
          });
        } else{
          console.log('Deleting ' + posts.length + ' posts.');
          posts.forEach(function(post){
            post.remove();
          });
          res.json({});
          return;
        }
      }
    });
  };
};

module.exports.id.del = function(data) {
  
  /* Set up variables */
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  
  /* Return a response function */
  return function(req, res){
    console.log('\nHttp Method:   DELETE \nRoute:         /posts/' + req.params.id + ' \nAction:        Deletes one post');
    async.parallel([
      function(callback){
        Post.find({_id: req.params.id}, null, {}, callback);
      }
    ],
    function(err, results){
      var post = results[0][0];
      
      /* Error handling */
      if(err){
        console.log('There was an error getting the post with the id ' + req.params.id + ' post: ' + err);
        res.json({
          error: err
        });
        return;
      } else{
        if(post === undefined){
          console.log('There is no post with the ID ' + req.params.id + '.');
          res.json({
            error: 'This post does not exist.'
          });
          return;
        } else{
          console.log('Deleting the post ' + post.name + '.');
          post.remove();
          res.json({});
          return;
        }
      }
    });
  };
};

module.exports.id.update = function(data) {
  
  /* Set up variables */
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  
  /* Return a response function */
  return function(req, res){
    console.log('\nHttp Method:   PUT \nRoute:         /posts/' + req.params.id + ' \nAction:        Updates one post');
    var post = {
      name: req.body.name,
      author: req.body.author,
      text: req.body.text,
      topicId: req.body.topicId   
    };
    Post.update({_id: req.params.id}, { $set: post}, {multi: false}, function(err, updatedPost){
      
      /* Error handling */
      if(err){
        res.json({
          error: err
        });
      } else{
        res.json({});
      }
    });
  };
};
