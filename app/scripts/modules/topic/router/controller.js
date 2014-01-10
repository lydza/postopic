define([
  /* Libraries */
  'communicator',
  'backbone',
  'jquery',
  /* Helpers */
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

    var showOneTopicRoute = function(slug){
      $.when(HelperFunctions.getOneTopic(slug)).done(function(topic){
        console.log(topic);
        App.mainRegion.show(new App.Topic.View.ShowOne({model: topic}));
      });
      console.log('One Topic');
    };

    var editTopicRoute = function(slug){
      console.log('Edit Topic');
      $.when(HelperFunctions.getOneTopic(slug)).done(function(topic){
        console.log(topic);
        App.mainRegion.show(new App.Topic.View.EditOne({model: topic}));
      });
    };

    var deleteTopicRoute = function(slug){
      console.log('Delete Topic');
      $.when(HelperFunctions.getOneTopic(slug)).done(function(topic){
        console.log(topic);
        App.mainRegion.show(new App.Topic.View.DeleteOne({model: topic}));
      });
    };

    var createTopicRoute = function(){
      console.log('Create Topic');
      App.mainRegion.show(new App.Topic.View.CreateOne());
    };

    var newPostInTopicRoute = function(slug){
      $.when(HelperFunctions.getOneTopic(slug)).done(function(topic){
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

    var showOneTopicPageChange = function(slug){
      $.when(HelperFunctions.getOneTopic(slug)).done(function(topic){
        console.log(topic);
        App.mainRegion.show(new App.Topic.View.ShowOne({model: topic}));
      });
      console.log('One Topic');
    };

    var editTopicPageChange = function(slug){
      $.when(HelperFunctions.getOneTopic(slug)).done(function(topic){
        console.log(topic);
        App.mainRegion.show(new App.Topic.View.EditOne({model: topic}));
      });
      console.log('Edit Topic');
    };

    var deleteTopicPageChange = function(slug){
      $.when(HelperFunctions.getOneTopic(slug)).done(function(topic){
        console.log(topic);
        App.mainRegion.show(new App.Topic.View.DeleteOne({model: topic}));
      });
      console.log('Delete Topic');
    };

    var createTopicPageChange = function(){
      App.mainRegion.show(new App.Topic.View.CreateOne());
      console.log('Create Topic');
    };

    var newPostInTopicPageChange = function(slug){
      $.when(HelperFunctions.getOneTopic(slug)).done(function(topic){
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
    Communicator.command.setHandler('pageChange:topic:show', function(slug){
      console.log('Topic Show Route: ' + slug);
      showOneTopicPageChange(slug);
    });
    Communicator.command.setHandler('pageChange:topic:edit', function(slug){
      console.log('Topic Edit Route: ' + slug);
      editTopicPageChange(slug);
    });
    Communicator.command.setHandler('pageChange:topic:delete', function(slug){
      console.log('Topic Delete Route: ' + slug);
      deleteTopicPageChange(slug);
    });
    Communicator.command.setHandler('pageChange:topic:create', function(){
      console.log('Topic Create Route');
      createTopicPageChange();
    });
    Communicator.command.setHandler('pageChange:topic:newPost', function(slug){
      console.log('Topic Add New Post Route: ' + slug);
      newPostInTopicPageChange(slug);
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
