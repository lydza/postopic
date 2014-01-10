define([
  /* Libraries */
  'communicator',
  'backbone',
  'jquery',
  /* Helpers */
  'modules/post/router/helper'
],

function(Communicator, Backbone, $, RouterHelper){
  'use strict';
  return function(App){

    var HelperFunctions = RouterHelper(App);

    /* Incoming routes from URLs */
    var showAllPostsRoute = function(){
      $.when(HelperFunctions.getAllPosts()).done(function(posts){
        console.log(posts);
        App.mainRegion.show(new App.Post.View.ShowAll({collection: posts}));
      });
      console.log('All Posts');
    };

    var showOnePostRoute = function(slug){
      $.when(HelperFunctions.getOnePost(slug)).done(function(post){
        console.log(post);
        App.mainRegion.show(new App.Post.View.ShowOne({model: post}));
      });
      console.log('One Post');
    };

    var editPostRoute = function(slug){
      console.log('Edit Post');
      $.when(HelperFunctions.getOnePost(slug)).done(function(post){
        console.log(post.toJSON());
        App.mainRegion.close();
        App.mainRegion.show(new App.Post.View.EditOne({model: post}));
      });
    };

    var deletePostRoute = function(slug){
      $.when(HelperFunctions.getOnePost(slug)).done(function(post){
        console.log(post.toJSON());
        App.mainRegion.close();
        App.mainRegion.show(new App.Post.View.DeleteOne({model: post}));
      });
      console.log('Delete Post');
    };

    /* Functions for internal page changes */
    var showAllPostsPageChange = function(){
      $.when(HelperFunctions.getAllPosts()).done(function(posts){
        console.log(posts);
        App.mainRegion.close();
        App.mainRegion.show(new App.Post.View.ShowAll({model: posts}));
      });
      console.log('All Posts');
    };

    var showOnePostPageChange = function(slug){
      $.when(HelperFunctions.getOnePost(slug)).done(function(post){
        console.log(post);
        App.mainRegion.close();
        App.mainRegion.show(new App.Post.View.ShowOne({model: post}));
      });
      console.log('One Post');
    };

    var editPostPageChange = function(slug){
      $.when(HelperFunctions.getOnePost(slug)).done(function(post){
        console.log(post);
        App.mainRegion.close();
        App.mainRegion.show(new App.Post.View.EditOne({model: post}));
      });
      console.log('Edit Post');
    };

    var deletePostPageChange = function(slug){
      $.when(HelperFunctions.getOnePost(slug)).done(function(post){
        console.log(post);
        App.mainRegion.close();
        App.mainRegion.show(new App.Post.View.DeleteOne({model: post}));
      });
      console.log('Delete Post');
    };

    /* Events listening to these routes */
    Communicator.command.setHandler('pageChange:posts', function(){
      console.log('Posts Route');
      showAllPostsPageChange();
    });
    Communicator.command.setHandler('pageChange:post:show', function(slug){
      console.log('Post Show Route: ' + slug);
      showOnePostPageChange(slug);
    });
    Communicator.command.setHandler('pageChange:post:edit', function(slug){
      console.log('Post Edit Route: ' + slug);
      editPostPageChange();
    });
    Communicator.command.setHandler('pageChange:post:delete', function(slug){
      console.log('Post Delete Route: ' + slug);
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
