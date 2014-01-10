define([
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
    var getAllTopics = function(){
      var data = new App.Topic.Collection();
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
    var getOneTopic = function(slug){
      var data = new App.Topic.Model(slug);
      var defer = $.Deferred();
      data.fetch({
        error: function(){
          // TODO: add error handling
        },
        success: function(topic, response){
          defer.resolve(topic);
        }
      });
      return defer.promise();
    };

    return {
      getOneTopic: getOneTopic,
      getAllTopics: getAllTopics
    };
  };
});
