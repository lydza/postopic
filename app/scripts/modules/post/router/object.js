define([
  'backbone'
],

function(Backbone){
  'use strict';
  return Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      'posts'           : 'showAllPosts',
      'post/:id/show'   : 'showOnePost',
      'post/:id/edit'   : 'editPost',
      'post/:id/delete' : 'deletePost'
    }
  });
});
