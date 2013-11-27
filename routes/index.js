/******************************************************************************
 *
 * Index routes - Holds all routes that don't begin with /post or /topic.
 * 
 * render |   '/'    | displays all posts and topics in the index view.
 * error  | '/error' | displays the error view.
 *
 *****************************************************************************/

module.exports.render = function(data) {
  var Post = data.database.model.post;
  var Topic = data.database.model.topic;
  var async = data.helper.async;
  return function(req, res){
    console.log('Route: /');
    async.parallel([
      function(callback) {
        Post.find(callback);
      },
      function(callback) {
        Topic.find(callback);
      }
    ],
    function(err, results) {
      var posts = results[0];
      var topics = results[1];
      if (err) {
        console.log('There was an error getting the data from the database:\n' + err);
        res.json({
          error: err
        });
        
      }
      else {
        console.log('Found ' + topics.length + ' topics and ' + posts.length + ' posts.');
        res.json({ 
          posts: posts,
          topics: topics
       });
      }
    });
  };
};

module.exports.error = function(req, res) {
  console.log('Route: /error');
  return res.render('error', {});
};
