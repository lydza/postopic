define([

  //Libraries
  "backbone",
  "underscore"
],

// Map dependencies from above array.
function(Backbone, _) {

  "use strict";

  // We just want a singleton object that extends Backbone.Events
  // We don't want to use Backbone Events directly, and we don't want to
  // use our app object for anything than initializing our app
  // (single responsibility principle)
  return _.extend({}, Backbone.Events);

});