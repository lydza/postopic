/******************************************************************************
 *
 * Topic routes - Holds all routes that begin with /topic
 * 
 * create | '/topic/create' | creates a new topic. gets data from req object
 * all    | '/topics'       | displays all topic
 * id     | 'topic/:id'     | displays a specific topic
 * 
 *****************************************************************************/

module.exports.create = function(data) {
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  return function(req, res){
    console.log('Route: /topic/create');
    var topic = new Topic({
      name: req.body.name,
      author: req.body.author,
      dateUpdated: Date.now(),
      dateCreated: Date.now()
    });
    topic.save(function (err, newTopic) {
      if (err) {
        console.log('There was an error saving this new topic to the database:\n' + err);
        res.redirect('/error');
        return;
      }
      newTopic.onCreate();
      res.redirect('/');
    });
  };
};

module.exports.all = function(data) {
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  return function(req, res){
    console.log('Route: /topics');
    Topic.find().sort({date: 'desc'}).exec(function(err, results){
      if(err){
        console.log('There was an error finding all posts:' + err);
        res.redirect('/error');
        return;
      } else{
        async.map(
          results, 
          function(item, callback){
            Post.find({topicId: item._id}).exec(function(err, posts){
              if(err){
                console.log('There was an error finding a topic with the ID ' + item.topicId + ':\n' + err);
                res.redirect('/error');
              } else{
                item.postCount = posts.length;
                return callback(null, item);
              }
            });
          }, 
          function(err, results){
            if(err){
              console.log('There was an error mapping posts to their topics:\n' + err);
              res.redirect('/error');
            } else{
              console.log('Found ' + results.length + ' topics and the amount of posts they belong to.');
              res.render('topics', {
                topics: results
              });
            }
          }
        );
      }
    });
  };
};

module.exports.id = function(data) {
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  return function(req, res){
    console.log('Route: /topic/' + req.params.id);
    async.parallel([
      function(callback){
        Topic.find({_id: req.params.id}, null, {}, callback);
      },
      function(callback){
        Post.find({topicId: req.params.id}, null, {}, callback);
      }
    ], 
    function(err, results){
      var topic = results[0];
      var posts = results[1];
      if(err){
        console.log('There was an error getting the topic and/or its associated posts: ' + err);
        res.redirect('/error');
      } else{
        console.log('Found ' + posts.length + ' posts for thie topic ' + topic.name + '.');
        res.render('topic', {
          posts: posts,
          topic: topic
        });
      }
    });
  };
};
