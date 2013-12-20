define([
  'communicator',
  'modules/post/model',
  'modules/post/collection',
  'modules/post/itemView',
  'modules/post/compositeView',
  'modules/post/router'
],

function(Communicator, Model, Collection, ItemView, CompositeView, Router){
  return function(){
    /* Initalizers TODO: Put it into an initializer function. O */
    var App = Communicator.reqres.request("application");

    App.module("Post", function(Post, Application, Backbone, Marionette, $, _){
      /* Set up some Variables used in this module */
      
      Post.Model = Model;
      Post.Collection = Collection;
      Post.ItemView = ItemView;
      Post.CompositeView = CompositeView;
      // TODO: Create a createview
      /* Initialize the router */
      Router();
    });
  };
});
