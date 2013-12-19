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
/* 
            data = new Topic.Collection();
        
            data.fetch({
              error: function(collection, response, options){
                // add error handling
              },
              success: function(collection, response, options){
                var view = new This.CompositeView({collection: collection});
                Application.mainRegion.show(view);
              }.bind(this)
            });
*/
          console.log("All Topics");
        },
        showOneTopic: function(id){
          var data = new Topic.Model(id);
            data.fetch({
              error: function(model, response, options){},
              success: function(model, response, options){
                Application.mainRegion.show(new Topic.ItemView({model: model}));
                console.log(model.toJSON());
              }.bind(this)
            });
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
