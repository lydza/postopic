module.exports.render = function(db) {
  var Post = db.models.post;
  var Topic = db.models.topic;
  var database = db.database;
  return function(req, res){
    console.log('Route: /');
    Post.find().setOptions({sort: 'date'}).exec(function(err, postResult){
        if(err){
        console.log('There was an error getting all posts from the database: \n' + err);
        res.redirect('/error');
        return;
        } else{
          console.log('Found ' + postResult.length + ' posts. Now looking for topics...');
          Topic.find().setOptions({sort: 'name'}).exec(function(err, topicResult){
              if(err){
                console.log('There was an error getting all topics from the database: \n' + err);
                res.redirect('/error');
                return;
              } else{
                  console.log('Found ' + topicResult.length + ' topics. Now rendering...');
                  res.render('index', { 
                    posts: postResult,
                    topics: topicResult
                  });
              }
            }
          )
        }
      }
    );
  };
};

module.exports.error = function(req, res) {
  console.log('Route: /error');
  return res.render('error', {});
};
