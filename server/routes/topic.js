/******************************************************************************
 *
 * Topic routes - Holds all routes that begin with /topic
 * 
 * create    | POST   '/api/topics'        | creates a new topic
 * all       | GET    '/api/topics'        | displays all topic
 * id        | GET    '/api/topics/:id'    | displays a specific topic
 * all.del   | DELETE '/api/topics'        | deletes all topics
 * id.del    | DELETE '/api/topics/:id'    | deletes this specific topic
 * id.update | PUT    '/api/topics/:id'    | updates a specific topic
 * 
 *****************************************************************************/

module.exports.create = function(data) {

  /* Set up variables */
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  return function(req, res){
    console.log('\nHttp Method:   POST \nRoute:         /topics \nAction:        Creates a new topic');
    var topic = new Topic({
      name: req.body.name,
      author: req.body.author,
      dateUpdated: Date.now(),
      dateCreated: Date.now()
    });
    topic.save(function (err, newTopic) {
      
      /* Error handling */
      if (err) {
        console.log('There was an error saving this new topic to the database:\n' + err);
        res.json({
          error: err
        });
      }
      newTopic.onCreate();
      res.json(newTopic);
    });
  };
};

module.exports.all = function(data) {

  /* Set up variables */
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  return function(req, res){
    console.log('\nHttp Method:   GET \nRoute:         /topics \nAction:        Shows all topics');
    Topic.find().sort({date: 'desc'}).exec(function(err, results){
      
      /* Error handling */
      if(err){
        console.log('There was an error finding all posts:' + err);
        res.json({
          error: err
        });
        return;
      } else{
        async.map(
          results, 
          function(item, callback){
            Post.find({topicId: item._id}).exec(function(err, posts){
              
              /* Error handling */
              if(err){
                console.log('There was an error finding a topic with the ID ' + item.topicId + ':\n' + err);
                res.json({
                  error: err
                });
              } else{
                var result = {
                  topic: item,
                  posts: posts
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
              console.log('Found ' + results.length + ' topics and the amount of posts that belong to them.');
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
  return function(req, res){
    console.log('\nHttp Method:   GET \nRoute:         /topics/' + req.params.id + ' \nAction:        Shows one topic');
    async.parallel([
      function(callback){
        Topic.find({_id: req.params.id}, null, {}, callback);
      },
      function(callback){
        Post.find({topicId: req.params.id}, null, {}, callback);
      }
    ], 
    function(err, results){
      var topic = results[0][0];
      var posts = results[1];
      
      /* Error handling */
      if(err){
        console.log('There was an error getting the topic and/or its associated posts: ' + err);
        res.json({
          error: err
        });
      } else{
        console.log('Found ' + posts.length + ' posts for thie topic ' + topic.name + '.');
        res.json({
          posts: posts,
          topic: topic
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
  return function(req, res){
    console.log('\nHttp Method:   DELETE \nRoute:         /topics \nAction:        Deletes all topics');
    async.parallel([
      function(callback){
        Topic.find({}, null, {}, callback);
      },
      function(callback){
        Post.find({}, null, {}, callback);
      }
    ], 
    function(err, results){
      var topics = results[0];
      var posts = results[1];
      
      /* Error handling */
      if(err){
        console.log('There was an error getting the topic and/or its associated posts: ' + err);
        res.json({
          error: err
        });
      } else{
        if(topics === undefined){
          console.log('There are no topics to delete.');
          res.json({
            error: 'There are no topics to delete.'
          });
        } else{
          console.log('Deleting ' + topics.length + ' topics and their ' + posts.length + ' posts.');
          topics.forEach(function(topic){
            topic.remove();
          });
          posts.forEach(function(post){
            post.remove();
          });
          res.json({});
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
  return function(req, res){
    console.log('\nHttp Method:   DELETE \nRoute:         /topics/' + req.params.id + ' \nAction:        Deletes one topic');
    async.parallel([
      function(callback){
        Topic.find({_id: req.params.id}, null, {}, callback);
      },
      function(callback){
        Post.find({topicId: req.params.id}, null, {}, callback);
      }
    ], 
    function(err, results){
      var topic = results[0][0];
      var posts = results[1];
      
      /* Error handling */
      if(err){
        console.log('There was an error getting the topic and/or its associated posts: ' + err);
        res.json({
          error: err
        });
        return;
      } else{
        if(topic === undefined){
          console.log('There is no topic with the ID ' + req.params.id + '.');
          res.json({
            error: 'There is no topic with this ID.'
          });
        } else{
          console.log('Deleting the topic' + topic.name + ' and its ' + posts.length + 'posts.');
          topic.remove();
          posts.forEach(function(post){
            post.remove();
          });
          res.json({});
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
  return function(req, res){
    console.log('\nHttp Method:   PUT \nRoute:         /topics/' + req.params.id + ' \nAction:        Updates one topic');
    var topic = {
      name: req.body.name,
      author: req.body.author,
      dateUpdated: Date.now()
    };
    Topic.update({_id: req.params.id}, { $set: topic}).exec();
    res.json({});
  };
};
