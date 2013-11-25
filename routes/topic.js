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
    Topic.find().sort({dateUpdated: 'desc'}).exec(function(err, results){
      if(err){
        console.log('There was an error finding all topics:\n' + err);
        res.redirect('/error');
        return;
      } else{
        console.log('Found ' + results.length + ' topics.');
        res.render('topics', {
          topics: results
        });
      }
    })
  };
};

module.exports.id = function(data) {
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  return function(req, res){
    console.log('Route: /topic/' + req.params.id);
    Topic.find().where('_id', req.params.id).exec(function(err, topicResults){
      if(err){
        console.log('There was an error finding the topics:\n' + err);
        res.redirect('/error');
        return;
      } else{
        console.log('Found the topic wih the id \'' + req.params.id + '\'. Now looking in the database for posts with that topic...');
        Post.find().where('topicId', req.params.id).exec(function(err, postResults){
          if(err){
            console.log('There was an error finding the posts associated with this topic:' + err);
            res.redirect('/error');
            return;
          }
          else{
            console.log('Found ' + postResults.length + ' posts for this topic.');
            res.render('topic', {
              posts: postResults,
              topic: topicResults[0]
            });
          }
        });
      }
    })
  };
};
