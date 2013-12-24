define([
  'backbone'
],

function(Backbone){
  return Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      "topics"      : "showAllTopics",
      "topic/create": "createTopic",
      "topic/:id"   : "showOneTopic"
    }
  });
});
