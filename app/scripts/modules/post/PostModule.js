define([
  'communicator',
  'modules/post/PostCompositeView'
],

function(Communicator, PostCompositeView){
  return function(){
    var App = Communicator.reqres.request("application");
    
    App.module("Post", function(Post, Application, Backbone, Marionette, $, _){
      Post.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "posts": "showAllPosts",
          "post/:id": "showOnePost"
        }
      });

      var API = {
        showAllPosts: function(){
          Application.mainRegion.show(PostCompositeView);
          console.log("All Posts");
        },
        showOnePost: function(){
          console.log("All Posts");
        }
      };
      
      Application.addInitializer(function(){    
        new Post.Router({
          controller: API
        });
      });
    });
  };
});
