define([
  'jquery'
],

function($){
  'use strict';
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
    var getOneTopic = function(id){
      var data = new App.Topic.Model(id);
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
