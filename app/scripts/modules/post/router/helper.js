define([
  'jquery'
],

function($){
  'use strict';
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
    return {
      getOnePost: getOnePost,
      getAllPosts: getAllPosts
    };
  };
});
