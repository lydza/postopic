define([
  'communicator'
],

function(Communicator){
  return function(){
    var App = Communicator.reqres.request("application");
    
    App.module("Topic", function(Topic, Application, Backbone, Marionette, $, _){

      /* Model */
      Topic.Model = Backbone.Model.extend({
    		initialize: function() {
    			console.log("initialize a Topic model");
    		},
        defaults : {
          topic: {
            name: "",
            author: "",
            text: "",
            topicId: "",
            date: "",
            _id: "",
            __v: 0
          },
          topic: {
            name: "",
            author: "",
            dateUpdated: "",
            dateCreated: "",
            _id: "",
            __v: 0
          }
        },
        url : function() {
          return this.id ? '/api/topics/' + this.id : '/api/topics'; 
        }
      });


      /* Collection */
      Topic.Collection = Backbone.Collection.extend({
    		initialize: function() {
    			console.log("initialize a Topics collection");
    		},
    		model: Topic.Model
    	});
      
      
      /* ItemView */
      Topic.ItemView = Backbone.Marionette.ItemView.extend({
        template: "#topic-item"
      });
      
      
      /* CompositeView */
      Topic.CompositeView = Backbone.Marionette.CompositeView.extend({
        template: "#topic-composite",
        itemView: Topic.ItemView,
        itemViewContainer: "ul",
  
        initialize: function(){
          console.log("Rendering CompositeView");
        }
      });

      /* Router */
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
      Application.addInitializer(function(){    
        var MyRouter = new Topic.Router({
          controller: API
        });
      });
    });
  };
});
