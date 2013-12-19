define([
  'communicator',
  'modules/topic/model',
  'modules/topic/collection',
  'modules/topic/itemView',
  'modules/topic/compositeView'
],

function(Communicator, Model, Collection, ItemView, CompositeView){
  return function(){
    /* Initalizers TODO: Put it into an initializer function. O */
    var App = Communicator.reqres.request("application");

    App.module("Topic", function(Topic, Application, Backbone, Marionette, $, _){
      /* Set up some Variables used in this module */
      
      Topic.Model = Model;
      Topic.Collection = Collection;
      Topic.ItemView = ItemView;
      Topic.CompositeView = CompositeView;
      
      Topic.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "topics": "showAllTopics",
          "topic/:id": "showOneTopic"
        }
      });
      
      /* API/Controller for the routes */
      var API = {
        showAllTopics: function(){
          Application.mainRegion.show(new Topic.CompositeView());
          console.log("All Topics");
        },
        showOneTopic: function(id){
          Application.mainRegion.show(new Topic.ItemView());
          console.log("One Topic");
        }
      };
      
      /* Add Application initializer */
      Application.on("initialize:before",function(){
        var MyRouter = new Topic.Router({
          controller: API
        });
      });
    });
  };
});
