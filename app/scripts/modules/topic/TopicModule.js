define([
  'communicator'
],

function(Communicator){
    return function(){
    var App = Communicator.reqres.request("application");
    
    App.module("Topic", function(Topic, Application, Backbone, Marionette, $, _){
      Topic.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "topics": "showAllTopics",
          "topic/:id": "showOneTopic"
        }
      });

      var API = {
        showAllTopics: function(){
          console.log("All Topics");
        },
        showOneTopic: function(){
          console.log("One Topic");
        }
      };
      
      Application.addInitializer(function(){    
        new Topic.Router({
          controller: API
        });
      });
    });
  };
});
