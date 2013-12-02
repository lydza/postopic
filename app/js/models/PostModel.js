define([

  // Libraries
  "backbone"

],

// Map dependencies from above array.
function(Backbone) {

  "use strict";

  // Default model
  return Backbone.Model.extend({
    urlRoot: '/api/posts'
  });

});
