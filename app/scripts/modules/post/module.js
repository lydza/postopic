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
        showAllPosts:  function(){
/* 
            data = new Post.Collection();
        
            data.fetch({
              error: function(collection, response, options){
                // add error handling
              },
              success: function(collection, response, options){
                var view = new Post.CompositeView({collection: collection});
                Application.mainRegion.show(view);
              }.bind(this)
            });
*/
          console.log("Many Post");
        },
        showOnePost: function(id){
          var data = new Post.Model(id);
            data.fetch({
              error: function(model, response, options){
                // add error handling code here
              },
              success: function(model, response, options){
                Application.mainRegion.show(new Post.ItemView({model: model}));
              }.bind(this)
            });
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
