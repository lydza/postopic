define([
  'communicator', 
  'backbone'
],

function(Communicator, Backbone){
  return Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      "posts"      : "showAllPosts",
      "post/create": "createPost",
      "post/:id"   : "showOnePost"
    }
  });
});
