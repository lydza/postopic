define([
  /* Libraries */
  'backbone'
],

function(Backbone){
  'use strict';
  /* 
   * This returns the AppRouter Object. The keys being passed into it are the
   * routes to be matched, and the values are the functions that need to be
   * called when the routes are matched. The functions come from the controller
   * that get passed into a new instance of the AppRouter Object.
   *
   * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.approuter.md]
   */
  return Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      'topics'               : 'showAllTopics',
      'topic/create'         : 'createOneTopic',
      'topic/:slug/show'     : 'showOneTopic',
      'topic/:slug/edit'     : 'editTopic',
      'topic/:slug/delete'   : 'deleteTopic',
      'topic/:slug/new_post' : 'newPostInTopic'
    }
  });
});
