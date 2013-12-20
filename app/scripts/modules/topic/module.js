define([
  'communicator',
  'modules/topic/model',
  'modules/topic/collection',
  'modules/topic/itemView',
  'modules/topic/compositeView',
  'modules/topic/router'
],

function(Communicator, Model, Collection, ItemView, CompositeView, Router){
  return function(){
    /* Initalizers TODO: Put it into an initializer function. O */
    var App = Communicator.reqres.request("application");

    App.module("Topic", function(Topic, Application, Backbone, Marionette, $, _){
      /* Set up some Variables used in this module */
      
      Topic.Model = Model;
      Topic.Collection = Collection;
      Topic.ItemView = ItemView;
      Topic.CompositeView = CompositeView;
      // TODO: Create a createview
      /* Initialize the router */
      Router();
    });
  };
});
