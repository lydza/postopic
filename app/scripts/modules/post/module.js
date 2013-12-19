define([
  'communicator',
  'modules/post/model',
  'modules/post/collection',
  'modules/post/itemView',
  'modules/post/compositeView'
],

function(Communicator, Model, Collection, ItemView, CompositeView){
  return function(){
    /* Initalizers TODO: Put it into an initializer function. O */
    var App = Communicator.reqres.request("application");

    App.module("Post", function(Post, Application, Backbone, Marionette, $, _){
      /* Set up some Variables used in this module */
      
      Post.Model = Model;
      Post.Collection = Collection;
      Post.ItemView = ItemView;
      Post.CompositeView = CompositeView;
      
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
      Application.on("initialize:before",function(){
        var MyRouter = new Post.Router({
          controller: API
        });
      });
    });
  };
});
