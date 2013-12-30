define([
  'communicator', 
  'backbone',
  'jquery'
],

function(Communicator, Backbone, $){
  return function(App){
  
    /* Functions for getting data */    
    var getAllPosts = function(){
      var data = new App.Post.Collection();
      var defer = $.Deferred();
      data.fetch({
        error: function(){
          // TODO: add error handling
        },
        success: function(collection, response){
          defer.resolve(collection);
        }
      });
      return defer.promise();
    };
    var getOnePost = function(id){
      var data = new App.Post.Model(id);
      var defer = $.Deferred();
      data.fetch({
        error: function(){
          // TODO: add error handling
        },
        success: function(post, response){
          defer.resolve(post);
        }
      });
      return defer.promise();
    };
    
    /* Incoming routes from URLs */
    var showAllPostsRoute = function(){
      var allPostsPromise = getAllPosts();
      $.when(allPostsPromise).done(function(posts){
        console.log(posts);
          App.mainRegion.show(new App.Post.View.ShowAll({collection: posts}));
      });
      console.log("All Posts");
    };
    
    var showOnePostRoute = function(id){
      var onePostPromise = getOnePost();
      $.when(onePostPromise).done(function(post){
        console.log(post.toJSON());
        App.mainRegion.show(new App.Post.View.ShowOne({model: post}));
      });
      console.log("One Post");
    };
    
    var editPostRoute = function(id ){
      console.log("Edit Post");
      App.mainRegion.show(new App.Post.View.EditOne({model: post}));
    };
    
    var deletePostRoute = function(){
      console.log("Delete Post");
    };
    
    /* Functions for internal page changes */
    var showAllPostsPageChange = function(){
      var allPostsPromise = getAllPosts();
      $.when(allPostsPromise).done(function(posts){
        console.log(posts);
        App.mainRegion.close();
        App.mainRegion.show(new App.Post.View.ShowAll({collection: posts}));
      });
      console.log("All Posts");
    };
    
    var showOnePostPageChange = function(id){
      var onePostPromise = getOnePost(id);
      $.when(onePostPromise).done(function(post){
        console.log(post.toJSON());
        App.mainRegion.close();
        App.mainRegion.show(new App.Post.View.ShowOne({model: post}));
      });
      console.log("One Post");
    };
    
    var editPostPageChange = function(){
      console.log("Edit Post");
    };
    
    var deletePostPageChange = function(){
      console.log("Delete Post");
    };
    
    /* Events listening to these routes */
    Communicator.command.setHandler("pageChange:posts", function(){
      console.log("Posts Route");
      showAllPostsPageChange();
    });
    Communicator.command.setHandler("pageChange:post:show", function(id){
      console.log("Post Show Route: " + id);
      showOnePostPageChange(id);
    });
    Communicator.command.setHandler("pageChange:post:edit", function(id){
      console.log("Post Edit Route: " + id);
      editPostPageChange();
    });
    Communicator.command.setHandler("pageChange:post:delete", function(id){
      console.log("Post Delete Route: " + id);
      deletePostPageChange();
    });
    
    /* API/Controller for the routes */
    return {
      showAllPosts: showAllPostsRoute,
      showOnePost: showOnePostRoute,
      editPost : editPostRoute,
      deletePost : deletePostRoute
    };
   };
});
