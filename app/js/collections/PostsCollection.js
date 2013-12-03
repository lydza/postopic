define([
  "models/PostModel",
  "backbone"
],

function(PostModel, Backbone) {

  "use strict";

  return Backbone.Collection.extend({
    model: PostModel,
    url: '/api/posts'
  });

});
