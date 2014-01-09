define([
  'backbone'
],

function(Backbone){
  'use strict';
  return Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      'posts'             : 'showAllPosts',
      'post/:slug/show'   : 'showOnePost',
      'post/:slug/edit'   : 'editPost',
      'post/:slug/delete' : 'deletePost'
    }
  });
});
