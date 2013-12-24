define([
  'communicator',
  'modules/topic/model',
  'modules/topic/collection',
  'modules/topic/itemView',
  'modules/topic/compositeView',
  'modules/topic/routerObject',
  'modules/topic/routerController'
],

function(Communicator, Model, Collection, ItemView, CompositeView, RouterObject, RouterController){
  return function(App){
    var routerController = RouterController(App);

    App.module("Topic", function(Topic, Application, Backbone, Marionette, $, _){
      /* Set up some Variables used in this module */
      
      Topic.Model = Model;
      Topic.Collection = Collection;
      Topic.ItemView = ItemView;
      Topic.CompositeView = CompositeView;
      // TODO: Create a createview
      /* Initialize the router */
      App.on("initialize:before",function(){
        console.log("Got the router");
        var TopicRouter = new RouterObject({
          controller: routerController
        });
      });
    });
  };
});
