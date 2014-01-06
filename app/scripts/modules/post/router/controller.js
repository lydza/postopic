define([
  'communicator', 
  'backbone',
  'jquery',
  'modules/post/router/helper'
],

function(Communicator, Backbone, $, RouterHelper){
  return function(App){
    
    var HelperFunctions = RouterHelper(App);
    
    /* Incoming routes from URLs */
    var showAllPostsRoute = function(){
      $.when(HelperFunctions.getAllPosts()).done(function(posts){
        console.log(posts);
          App.mainRegion.show(new App.Post.View.ShowAll({collection: posts}));
      });
      console.log("All Posts");
    };
    
    var showOnePostRoute = function(id){
      $.when(HelperFunctions.getOnePost(id)).done(function(post){
        console.log(post);
        App.mainRegion.show(new App.Post.View.ShowOne({model: post}));
      });
      console.log("One Post");
    };
    
    var editPostRoute = function(id){
      console.log("Edit Post");
      $.when(HelperFunctions.getOnePost(id)).done(function(post){
        console.log(post.toJSON());
        App.mainRegion.close();
        App.mainRegion.show(new App.Post.View.EditOne({model: post}));
      });
    };
    
    var deletePostRoute = function(id){
      $.when(HelperFunctions.getOnePost(id)).done(function(post){
        console.log(post.toJSON());
        App.mainRegion.close();
        App.mainRegion.show(new App.Post.View.DeleteOne({model: post}));
      });
      console.log("Delete Post");
    };
    
    /* Functions for internal page changes */
    var showAllPostsPageChange = function(){
      $.when(HelperFunctions.getAllPosts()).done(function(posts){
        console.log(posts);
        App.mainRegion.close();
        App.mainRegion.show(new App.Post.View.ShowAll({model: posts}));
      });
      console.log("All Posts");
    };
    
    var showOnePostPageChange = function(id){
      $.when(HelperFunctions.getOnePost(id)).done(function(post){
        console.log(post);
        App.mainRegion.close();
        App.mainRegion.show(new App.Post.View.ShowOne({model: post}));
      });
      console.log("One Post");
    };
    
    var editPostPageChange = function(id){
      $.when(HelperFunctions.getOnePost(id)).done(function(post){
        console.log(post);
        App.mainRegion.close();
        App.mainRegion.show(new App.Post.View.EditOne({model: post}));
      });
      console.log("Edit Post");
    };
    
    var deletePostPageChange = function(id){
      $.when(HelperFunctions.getOnePost(id)).done(function(post){
        console.log(post);
        App.mainRegion.close();
        App.mainRegion.show(new App.Post.View.DeleteOne({model: post}));
      });
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
