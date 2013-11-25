/******************************************************************************
 *
 * Post routes - Holds all routes that begin with /post.
 * 
 * create | '/post/create' | creates a new post. gets data from req object
 * all    | '/posts'       | displays all posts
 * id     | 'post/:id'     | displays a specific post
 * 
 *****************************************************************************/

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
        async.map(
          results, 
          function(item, callback){
            Topic.findOne({_id: item.topicId}).exec(function(err, topic){
              if(err){
                console.log('There was an error finding a topic with the ID ' + item.topicId + ':\n' + err);
                res.redirect('/error');
              } else{
                item.topic = topic;
                return callback(null, item);
              }
            });
          }, 
          function(err, results){
            if(err){
              console.log('There was an error mapping posts to their topics:\n' + err);
              res.redirect('/error');
            } else{
              console.log('Found ' + results.length + ' posts and all their associated topics.');
              res.render('posts', {
                posts: results
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
    console.log('Route: /post/' + req.params.id);
    Post.findOne({_id: req.params.id}).exec(function(err, postResult){
      if(err){
        console.log('There was an error finding the post with the id' + req.params.id + ': \n' + err);
        res.redirect('/error');
        return;
      } else{
        console.log('Found the post with the id ' + req.params.id + '. Now looking for the topic with the id ' + postResult.topicId + ' associated with it...');
        Topic.findOne({_id: postResult.topicId}).exec(function(err, topicResult){
          if(err){
            console.log('There was an error finding the topic associated with this post: \n' + err);
            res.redirect('/error');
          } else{
            console.log('Found the topic associated with this post.');
            res.render('post', {
              post: postResult,
              topic: topicResult
            });
          }
        });
      }
    })
  };
};
