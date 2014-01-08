define([
  'communicator',
  'backbone',
  'jquery',
  'modules/topic/router/helper'
],

function(Communicator, Backbone, $, RouterHelper){
  'use strict';
  return function(App){

    var HelperFunctions = RouterHelper(App);

    /* Incoming routes from URLs */
    var showAllTopicsRoute = function(){
      $.when(HelperFunctions.getAllTopics()).done(function(topics){
        console.log(topics);
        App.mainRegion.show(new App.Topic.View.ShowAll({collection: topics}));
      });
      console.log('All Topics');
    };

    var showOneTopicRoute = function(id){
      $.when(HelperFunctions.getOneTopic(id)).done(function(topic){
        console.log(topic);
        App.mainRegion.show(new App.Topic.View.ShowOne({model: topic}));
      });
      console.log('One Topic');
    };

    var editTopicRoute = function(id){
      console.log('Edit Topic');
      $.when(HelperFunctions.getOneTopic(id)).done(function(topic){
        console.log(topic);
        App.mainRegion.show(new App.Topic.View.EditOne({model: topic}));
      });
    };

    var deleteTopicRoute = function(id){
      console.log('Delete Topic');
      $.when(HelperFunctions.getOneTopic(id)).done(function(topic){
        console.log(topic);
        App.mainRegion.show(new App.Topic.View.DeleteOne({model: topic}));
      });
    };

    var createTopicRoute = function(){
      console.log('Create Topic');
      App.mainRegion.show(new App.Topic.View.CreateOne());
    };

    var newPostInTopicRoute = function(id){
      $.when(HelperFunctions.getOneTopic(id)).done(function(topic){
        console.log(topic);
        App.mainRegion.show(new App.Post.View.CreateOne({model: topic}));
      });
      console.log('New Post in Topic');
    };

    /* Functions for internal page changes */
    var showAllTopicsPageChange = function(){
      $.when(HelperFunctions.getAllTopics()).done(function(topics){
        console.log(topics);
        App.mainRegion.show(new App.Topic.View.ShowAll({collection: topics}));
      });
      console.log('All Topics');
    };

    var showOneTopicPageChange = function(id){
      $.when(HelperFunctions.getOneTopic(id)).done(function(topic){
        console.log(topic);
        App.mainRegion.show(new App.Topic.View.ShowOne({model: topic}));
      });
      console.log('One Topic');
    };

    var editTopicPageChange = function(id){
      $.when(HelperFunctions.getOneTopic(id)).done(function(topic){
        console.log(topic);
        App.mainRegion.show(new App.Topic.View.EditOne({model: topic}));
      });
      console.log('Edit Topic');
    };

    var deleteTopicPageChange = function(id){
      $.when(HelperFunctions.getOneTopic(id)).done(function(topic){
        console.log(topic);
        App.mainRegion.show(new App.Topic.View.DeleteOne({model: topic}));
      });
      console.log('Delete Topic');
    };

    var createTopicPageChange = function(){
      App.mainRegion.show(new App.Topic.View.CreateOne());
      console.log('Create Topic');
    };

    var newPostInTopicPageChange = function(id){
      $.when(HelperFunctions.getOneTopic(id)).done(function(topic){
        console.log(topic);
        App.mainRegion.show(new App.Post.View.CreateOne({model: topic}));
      });
      console.log('Delete Topic');
    };
    /* Events listening to these routes */
    Communicator.command.setHandler('pageChange:topics', function(){
      console.log('Topics Route');
      showAllTopicsPageChange();
    });
    Communicator.command.setHandler('pageChange:topic:show', function(id){
      console.log('Topic Show Route: ' + id);
      showOneTopicPageChange(id);
    });
    Communicator.command.setHandler('pageChange:topic:edit', function(id){
      console.log('Topic Edit Route: ' + id);
      editTopicPageChange(id);
    });
    Communicator.command.setHandler('pageChange:topic:delete', function(id){
      console.log('Topic Delete Route: ' + id);
      deleteTopicPageChange(id);
    });
    Communicator.command.setHandler('pageChange:topic:create', function(){
      console.log('Topic Create Route');
      createTopicPageChange();
    });
    Communicator.command.setHandler('pageChange:topic:newPost', function(id){
      console.log('Topic Add New Post Route: ' + id);
      newPostInTopicPageChange(id);
    });

    /* API/Controller for the routes */
    return {
      showAllTopics: showAllTopicsRoute,
      showOneTopic: showOneTopicRoute,
      editTopic : editTopicRoute,
      deleteTopic : deleteTopicRoute,
      createOneTopic : createTopicRoute,
      newPostInTopic : newPostInTopicRoute
    };
  };
});
