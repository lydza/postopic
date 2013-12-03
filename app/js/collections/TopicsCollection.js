define([
  "models/TopicModel",
  "backbone"
],

function(TopicModel, Backbone) {

  "use strict";

  return Backbone.Collection.extend({
    model: TopicModel,
    url: '/api/topics'
  });

});
