define([
  'communicator', 
  'backbone'
],

function(Communicator, Backbone){
  return function(App){
    
    /* Functions that are called when the Router routes are matched */
    var allTopicsRoute = function(){
      /*
       * Doesn't work :(
       */
      var data = new App.Topic.Collection();

      data.fetch({

        error: function(collection, response, options){
          // TODO: add error handling
        },

        success: function(collection, response, options){
          var view = new App.Topic.CompositeView({collection: collection});
          App.mainRegion.show(view);
        }.bind(this)

      });

      console.log("All Topics");

    };
    
    var oneTopicRoute = function(id){

      var data = new App.Topic.Model(id);
        data.fetch({

          error: function(model, response, options){
            // TODO: add error handling
          },

          success: function(model, response, options){
            App.mainRegion.show(new App.Topic.ItemView({model: model}));
            console.log(model.toJSON());
          }.bind(this)

        });

      console.log("One Topic");

    };
    
    var createTopicRoute = function(){
      console.log("Create Topic");
    };
    
    /* API/Controller for the routes */
    return {
      showAllTopics: allTopicsRoute,
      showOneTopic: oneTopicRoute,
      createTopic: createTopicRoute
    };
   };
});
