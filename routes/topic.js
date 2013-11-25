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
    console.log('name: ' + req.body.name + '\nauthor: ' + req.body.author);
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
    console.log('Route: /topic/:id');
    console.log('Looking in the database for the topic: ' + req.params.id + '...');
    Topic.find().where('_id', req.params.id).exec(function(err, topicResults){
      if(err){
        console.log('There was an error finding the topics:\n' + err);
        res.redirect('/error');
        return;
      } else{
        console.log('Found the topic. It has the length '+ topicResults.length +' (should be 1). Now looking in the database for the a posts with that topic...');
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
