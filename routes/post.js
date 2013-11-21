module.exports.create = function(db) {
  var Post = db.models.post;
  var Topic = db.models.topic;
  var database = db.database;
  return function(req, res){
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
  };
};

module.exports.all = function(db) {
  var Post = db.models.post;
  var Topic = db.models.topic;
  var database = db.database;
  return function(req, res){
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
    });
  };
};

module.exports.id = function(db) {
  var Post = db.models.post;
  var Topic = db.models.topic;
  var database = db.database;
  return function(req, res){
    Post.find().where('_id', req.params.id).sort({date: 'asc'}).exec(function(err, results){
      if(err){
        console.log('There was an error finding the posts.');
        res.redirect('/');
        return;
      } else{
        console.log('Found the post with this ID.\n' + results);
        res.render('post', {
          post: results[0]
        });
      }
    })
  };
};
