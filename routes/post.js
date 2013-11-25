module.exports.create = function(data) {
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  return function(req, res){
    console.log('Route: /post/create');
    var post = new Post({
      name: req.body.name,
      author: req.body.author,
      text: req.body.text,
      topicId: req.body.topicId,
      date: Date.now()
    });
    post.save(function (err, newPost) {
      if (err) {
        console.log('There was an error saving this new post to the database: ' + err);
        res.redirect('/error');
        return;
      }
      newPost.onCreate();
      res.redirect('/');
      return;
    });
  };
};

module.exports.all = function(data) {
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  return function(req, res){
    console.log('Route: /posts');
    Post.find().sort({date: 'desc'}).exec(function(err, results){
      if(err){
        console.log('There was an error finding all posts:' + err);
        res.redirect('/error');
        return;
      } else{
        console.log('Found ' + results.length + ' posts.');
        res.render('posts', {
          posts: results
        });
      }
    });
  };
};

module.exports.id = function(data) {
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  return function(req, res){
    console.log('Route: /post/:id');
    Post.find().where('_id', req.params.id).sort({date: 'asc'}).exec(function(err, postResults){
      if(err){
        console.log('There was an error finding the post with the id' + req.params.id + ': \n' + err);
        res.redirect('/error');
        return;
      } else{
        console.log('Found the post with the id ' + req.params.id + '. Now looking for the topic with the id ' + postResults[0].topicID + ' associated with it...');
        Topic.find().where('_id', postResults[0].topicId).exec(function(err, topicResults){
          if(err){
            console.log('There was an error finding the topic associated with this post: \n' + err);
            res.redirect('/error');
          } else{
            console.log('Found ' + topicResults.length + ' topic associated with this post. Should be 1.');
            res.render('post', {
              post: postResults[0],
              topic: topicResults[0]
            });
          }
        });
      }
    })
  };
};
