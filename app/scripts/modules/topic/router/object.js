define([
  'backbone'
],

function(Backbone){
  'use strict';
  return Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      'topics'             : 'showAllTopics',
      'topic/create'       : 'createOneTopic',
      'topic/:id/show'     : 'showOneTopic',
      'topic/:id/edit'     : 'editTopic',
      'topic/:id/delete'   : 'deleteTopic',
      'topic/:id/new_post' : 'newPostInTopic'
    }
  });
});
