define([
  /* Libraries */
  'jquery'
],

function($){
  'use strict';
  /*
   * This returns a hash. The key is an alias to the function (the value).
   * These functions are simply helpers. They return promises for the data
   * being fetched.
   */
  return function(App){
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
    var getOnePost = function(slug){
      var data = new App.Post.Model(slug);
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
    return {
      getOnePost: getOnePost,
      getAllPosts: getAllPosts
    };
  };
});
