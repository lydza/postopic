/******************************************************************************
 *
 * Post routes - Holds all routes that begin with /posts
 * 
 * create      | POST   '/api/posts'          | creates a new post
 * all         | GET    '/api/posts'          | displays all posts
 * slug        | GET    '/api/posts/:slug'    | displays a specific post
 * all.del     | DELETE '/api/posts'          | deletes all posts
 * slug.del    | DELETE '/api/posts/:slug'    | deletes this specific post
 * slug.update | PUT    '/api/posts/:slug'    | updates a specific post
 * 
 *****************************************************************************/

module.exports.create = function(data) {
  /* Set up variables */
  var slug = data.helper.slug;
  
  /* Return a request/response function */
  return function(req, res){
    console.log('\nHttp Method:   POST \nRoute:         /posts/ \nAction:        Creates a new post');
   
    data.req = req;
    data.res = res;
    
    addUniqueSlug(data, slug((req.body.name).toLowerCase(), '_'), 0);
  };
};

function addUniqueSlug(data, slug, number){
  var Post = data.database.model.post;
  var testSlug;
  
  if(number === 0){
    testSlug = slug;
  } else {
    testSlug = slug + number;
  }
  
  console.log("Add Unique Slug: Test Slug: " + testSlug);
  
  Post.findOne({slug: testSlug}).exec(function(err, postResult){
    /* Error handling */
    if(err){
      console.log('There was an error finding a post associated with this slug: \n' + err);
      res.json({
        error: 'There was an error finding a post associated with this slug',
        errorMessage: err
      });
    } else {
      if(postResult === null){
        savePost(data, testSlug);
      }
      else {
        addUniqueSlug(data, slug, number+1);
      }
    }
  });
}

function savePost(data, slug){
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var req = data.req;
  var res = data.res;
  
  console.log("Save Post: Slug: " + slug);
  
  var post = new Post({
    name: req.body.name,
    slug: slug,
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
        error: 'There was an error finding the topic associated with this post.',
        errorMessage: err
      });
    } else{
    
      /* Leave if there is no Topic associated with this new post's topicId */
      if(topicResult === null){
        console.log('There is no topic associated with this post. Can\'t add it to the database.');
        res.json({
          error: 'There is no topic associated with this post. Can\'t add it to the daatabase.',
        });
      } else {
          
        /* Save because there is an associated topic */
        post.save(function (err, newPost) {

        /* Error handling */
          if(err) {
            console.log('There was an error saving this new post to the database: ' + err);
            res.json({
              error: 'There was an error saving this new post to the database.',
              errorMessage: err
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
}

module.exports.all = function(data) {

  /* Set up variables */
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  var limit = 2;
  
  /* Return a response function */
  return function(req, res){
    console.log('\nHttp Method:   GET \nRoute:         /posts \nAction:        Shows all posts');
    var offset = req.params.page * limit - 1;
    /* Find all Posts sorted in descending order by date */
    Post.find().sort({date: 'desc'}).exec(function(err, results){

      /* Error handling */
      if(err){
        console.log('There was an error finding all posts:' + err);
        res.json({
          error: 'There was an error finding all posts.',
          errorMessage: err
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
                  error: 'There was an error finding a topic with the ID ' + item.topicId,
                  errorMessage: err
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
                error: 'There was an error mapping posts to their topics.',
                errorMessage: err
              });
            } else{
              console.log('Found ' + results.length + ' posts and all their associated topics.');
              
              returnValue = {
                posts: results.splice(offset, limit),
                numberOfPages: results.length / limit
              };
              res.json(returnValue);
            }
          }
        );
      }
    });
  };
};

module.exports.slug = function(data) {

  /* Set up variables */
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  
  /* Return a response function */
  return function(req, res){
    console.log('\nHttp Method:   GET \nRoute:         /posts/' + req.params.slug + ' \nAction:        Shows one post');
    Post.findOne({slug: req.params.slug}).exec(function(err, postResult){
      
      /* Error handling */
      if(err){
        console.log('There was an error finding the post with the slug' + req.params.slug + ': \n' + err);
        res.json({
          error: 'There was an error finding the topic with the slug ' + req.params.slug,
          errorMessage: err
        });
        return;
      } else{
      
        /* Checks to see if there is no post with this slug */
        if(postResult === null){
          console.log('There are no posts with this slug.');
          res.json({
            error: 'There are no posts with this slug.'
          });
          return;
        }
        console.log('Found the post with the slug ' + req.params.slug + '. Now looking for the topic with the id ' + postResult.topicId + ' associated with it...');
        
        /* Looks for a topic with the topicId */
        Topic.findOne({_id: postResult.topicId}).exec(function(err, topicResult){
          
          /* Error handling */
          if(err){
            console.log('There was an error finding the topic associated with this post: \n' + err);
            res.json({
              error: 'There was an error finding the topic associated with this post',
              errorMessage: err
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
          error: 'There was an error getting all posts.',
          errorMessage: err
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

module.exports.slug.del = function(data) {
  
  /* Set up variables */
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  
  /* Return a response function */
  return function(req, res){
    console.log('\nHttp Method:   DELETE \nRoute:         /posts/' + req.params.slug + ' \nAction:        Deletes one post');
    async.parallel([
      function(callback){
        Post.find({slug: req.params.slug}, null, {}, callback);
      }
    ],
    function(err, results){
      var post = results[0][0];
      
      /* Error handling */
      if(err){
        console.log('There was an error getting a post with the slug ' + req.params.slug + ': ' + err);
        res.json({
          error: 'There was an error getting a post with this slug ' + req.params.slug,
          errorMessage: err
        });
        return;
      } else{
        if(post === undefined){
          console.log('There is no post with the slug ' + req.params.slug + '.');
          res.json({
            error: 'This post does not exist.',
            errorMessage: 'This post does not exist.'
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

module.exports.slug.update = function(data) {
  
  /* Set up variables */
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  
  /* Return a response function */
  return function(req, res){
    console.log('\nHttp Method:   PUT \nRoute:         /posts/' + req.params.slug + ' \nAction:        Updates one post');
    var post = {
      name: req.body.name,
      author: req.body.author,
      text: req.body.text,
      topicId: req.body.topicId   
    };
    Post.update({slug: req.params.slug}, { $set: post}, {multi: false}, function(err, updatedPost){
      
      /* Error handling */
      if(err){
        console.log('There was an error updating the post with the slug: ' + req.body.slug + '/n' + err);
        res.json({
          error: 'There was an error updating the post with the slug ' + req.body.slug,
          errorMessage: err
        });
      } else{
        res.json({});
      }
    });
  };
};
