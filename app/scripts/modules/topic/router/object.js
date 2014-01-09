define([
  'backbone'
],

function(Backbone){
  'use strict';
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
