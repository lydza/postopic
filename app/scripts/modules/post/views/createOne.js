define([
  /* Libraries */
  'backbone',
  /* Templates */
  'hbs!modules/post/templates/createOne'
],

function(Backbone, CreateOneTemplate){
  'use strict';
  /*
   * Returns a Marionette.ItemView with a template.
   * 
   * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.itemview.md]
   */
  return Backbone.Marionette.ItemView.extend({
    template: CreateOneTemplate
  });
});
