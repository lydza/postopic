define([
  'communicator',
  'modules/topic/model',
  'modules/topic/collection',
  'modules/topic/router/object',
  'modules/topic/router/controller',
  'modules/topic/views/showAll',
  'modules/topic/views/showOneInAll',
  'modules/topic/views/showOne',
  'modules/topic/views/editOne',
  'modules/topic/views/deleteOne',
  'modules/topic/views/createOne'
],

function(Communicator, Model, Collection, RouterObject, RouterController, ShowAllView, ShowOneInAllView, ShowOneView, EditOneView, DeleteOneView, CreateOneView){
  'use strict';
  return function(App){
    App.module('Topic', function(Topic, Application, Backbone, Marionette, $, _){
      Topic.Model = Model;
      Topic.Collection = Collection;
    });
    App.module('Topic.View', function(View, Application, Backbone, Marionette, $, _){
      View.ShowAll = ShowAllView;
      View.ShowOneInAll = ShowOneInAllView;
      View.ShowOne = ShowOneView;
      View.EditOne = EditOneView;
      View.DeleteOne = DeleteOneView;
      View.CreateOne = CreateOneView;
    });
    App.module('Topic.Router', function(Router, Application, Backbone, Marionette, $, _){
      Router.Object = RouterObject;
      Router.Controller = RouterController(Application);
    });
    App.on('initialize:before',function(){
        console.log('Got the router');
        var TopicRouter = new App.Topic.Router.Object({
          controller: App.Topic.Router.Controller
        });
      });
  };
});
