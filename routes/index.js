module.exports.render = function(db) {
  var Post = db.models.post;
  var Topic = db.models.topic;
  var database = db.database;
  return function(req, res){
    Post.find().setOptions({sort: 'date'}).exec(function(err, postResult){
        if(err){
        console.log('There was an error getting the posts from the database.');
        res.redirect('/');
        return;
        } else{
          console.log('There were ' + postResult.length + ' posts. Now looking for the topics.');
          Topic.find().setOptions({sort: 'name'}).exec(function(err, topicResult){
              if(err){
                console.log('There was an error getting the posts from the database.');
                res.redirect('/');
                return;
              } else{
                  console.log('There were ' + topicResult.length + ' topics. Now rendering.');
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
