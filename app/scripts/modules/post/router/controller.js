define([
  'communicator', 
  'backbone'
],

function(Communicator, Backbone){
  return function(App){
    
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
          var view = new App.Post.View.ShowAll({collection: collection});
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
            App.mainRegion.show(new App.Post.View.ShowOne({model: model}));
            console.log(model.toJSON());
          }.bind(this)

        });

      console.log("One Post");

    };
    
    var createPostRoute = function(){
      console.log("Create Post");
    };
    
    /* Events listening to these routes */
    Communicator.command.setHandler("pageChange:posts", function(){
      console.log("Posts Route");
    });
    Communicator.command.setHandler("pageChange:post:show", function(id){
      console.log("Post Show Route: " + id);
    });
    Communicator.command.setHandler("pageChange:post:edit", function(id){
      console.log("Post Edit Route: " + id);
    });
    Communicator.command.setHandler("pageChange:post:delete", function(id){
      console.log("Post Delete Route: " + id);
    });
    
    /* API/Controller for the routes */
    return {
      showAllPosts: allPostsRoute,
      showOnePost: onePostRoute,
      createPost: createPostRoute
    };
   };
});
