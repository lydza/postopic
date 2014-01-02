define([
  'backbone'
],

function(Backbone){
  return Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      "topics"           : "showAllTopics",
      "topic/:id/show"   : "showOneTopic",
      "topic/:id/edit"   : "editTopic",
      "topic/:id/delete" : "deleteTopic"
    }
  });
});
