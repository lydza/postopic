define([
  'communicator', 
  'backbone'
],

function(Communicator, Backbone){
  return function(){
    var App = Communicator.reqres.request("application");

    /* Main router for the application */
    var Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        "posts"      : "showAllPosts",
        "post/create": "createPost",
        "post/:id"   : "showOnePost"
      }
    });
    
    /* Functions that are called when the Router routes are matched */
    var allPostsRoute = function(){
      /*
       * Doesn't work :(
       */
      var data = new App.Post.Collection();

      data.fetch({

        error: function(collection, response, options){
          // TODO: add error handling
        },

        success: function(collection, response, options){
          var view = new App.Post.CompositeView({collection: collection});
          App.mainRegion.show(view);
        }.bind(this)

      });

      console.log("All Posts");

    };
    
    var onePostRoute = function(id){

      var data = new App.Post.Model(id);
        data.fetch({

          error: function(model, response, options){
            // TODO: add error handling
          },

          success: function(model, response, options){
            App.mainRegion.show(new App.Post.ItemView({model: model}));
            console.log(model.toJSON());
          }.bind(this)

        });

      console.log("One Post");

    };
    
    var createPostRoute = function(){
      console.log("Create Post");
    };
    
    /* API/Controller for the routes */
    var API = {
      showAllPosts: allPostsRoute,
      showOnePost: onePostRoute,
      createPost: createPostRoute
    };
     
    /* Add Application initializer */
    App.on("initialize:before",function(){
      console.log("Got the router");
      var MyRouter = new Router({
        controller: API
      });
    });
   };
});
