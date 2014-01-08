define([
  'communicator',
  'modules/post/model',
  'modules/post/collection',
  'modules/post/router/object',
  'modules/post/router/controller',
  'modules/post/views/showAll',
  'modules/post/views/showOneInAll',
  'modules/post/views/showOne',
  'modules/post/views/editOne',
  'modules/post/views/deleteOne',
  'modules/post/views/createOne'
],

function(Communicator, Model, Collection, RouterObject, RouterController, ShowAllView, ShowOneInAllView, ShowOneView, EditOneView, DeleteOneView, CreateOneView){
  'use strict';
  return function(App){
    App.module('Post', function(Post, Application, Backbone, Marionette, $, _){
      Post.Model = Model;
      Post.Collection = Collection;
    });
    App.module('Post.View', function(View, Application, Backbone, Marionette, $, _){
      View.ShowAll = ShowAllView;
      View.ShowOneInAll = ShowOneInAllView;
      View.ShowOne = ShowOneView;
      View.EditOne = EditOneView;
      View.DeleteOne = DeleteOneView;
      View.CreateOne = CreateOneView;
    });
    App.module('Post.Router', function(Router, Application, Backbone, Marionette, $, _){
      Router.Object = RouterObject;
      Router.Controller = RouterController(Application);
    });
    App.on('initialize:before',function(){
        console.log('Got the router');
        var PostRouter = new App.Post.Router.Object({
          controller: App.Post.Router.Controller
        });
      });
  };
});
