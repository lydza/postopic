module.exports.create = function(db) {
  var Post = db.models.post;
  var Topic = db.models.topic;
  var database = db.database;
  return function(req, res){
    console.log('Route: /post/create');
    var post = new Post({
      name: req.body.name,
      author: req.body.author,
      text: req.body.text,
      date: Date.now(),
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

module.exports.all = function(db) {
  var Post = db.models.post;
  var Topic = db.models.topic;
  var database = db.database;
  return function(req, res){
    console.log('Route: /posts');
    Post.find().sort({date: 'asc'}).exec(function(err, results){
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

module.exports.id = function(db) {
  var Post = db.models.post;
  var Topic = db.models.topic;
  var database = db.database;
  return function(req, res){
    console.log('Route: /post/:id');
    Post.find().where('_id', req.params.id).sort({date: 'asc'}).exec(function(err, results){
      if(err){
        console.log('There was an error finding the post with the id' + req.params.id + ': \n' + err);
        res.redirect('/error');
        return;
      } else{
        console.log('Found the post with the id ' + req.params.id + '\n' + results);
        res.render('post', {
          post: results[0]
        });
      }
    })
  };
};
