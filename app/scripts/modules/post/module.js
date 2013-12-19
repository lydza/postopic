define([
  'communicator'
],

function(Communicator){
  return function(){
    var App = Communicator.reqres.request("application");
    
    App.module("Post", function(Post, Application, Backbone, Marionette, $, _){

      /* Model */
      Post.Model = Backbone.Model.extend({
    		initialize: function() {
    			console.log("initialize a Post model");
    		},
        defaults : {
          post: {
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
          return this.id ? '/api/posts/' + this.id : '/api/posts'; 
        }
      });


      /* Collection */
      Post.Collection = Backbone.Collection.extend({
    		initialize: function() {
    			console.log("initialize a Posts collection");
    		},
    		model: Post.Model
    	});
      
      
      /* ItemView */
      Post.ItemView = Backbone.Marionette.ItemView.extend({
        template: "#post-item"
      });
      
      
      /* CompositeView */
      Post.CompositeView = Backbone.Marionette.CompositeView.extend({
        template: "#post-composite",
        itemView: Post.ItemView,
        itemViewContainer: "ul",
  
        initialize: function(){
          console.log("Rendering CompositeView");
        }
      });

      /* Router */
      Post.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "posts": "showAllPosts",
          "post/:id": "showOnePost"
        }
      });
      
      /* API/Controller for the routes */
      var API = {
        showAllPosts: function(){
          Application.mainRegion.show(new Post.CompositeView());
          console.log("All Posts");
        },
        showOnePost: function(id){
          Application.mainRegion.show(new Post.ItemView());
          console.log("One Post");
        }
      };
      
            
      /* Add Application initializer */
      Application.addInitializer(function(){    
        var MyRouter = new Post.Router({
          controller: API
        });
      });
    });
  };
});
