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
    
    /* Events listening to these routes */
    Communicator.command.setHandler("pageChange:topics", function(){
      console.log("Topics Route");
    });
    Communicator.command.setHandler("pageChange:topic:create", function(){
      console.log("Topic Create Route");
    });
    Communicator.command.setHandler("pageChange:topic:show", function(id){
      console.log("Topic Show Route: " + id);
    });
    Communicator.command.setHandler("pageChange:topic:edit", function(id){
      console.log("Topic Edit Route: " + id);
    });
    Communicator.command.setHandler("pageChange:topic:delete", function(id){
      console.log("Topic Delete Route: " + id);
    });
    Communicator.command.setHandler("pageChange:topic:newPost", function(id){
      console.log("Topic New Post Route: " + id);
    });
    
    /* API/Controller for the routes */
    return {
      showAllTopics: allTopicsRoute,
      showOneTopic: oneTopicRoute,
      createTopic: createTopicRoute
    };
   };
});
