define([
  'backbone',
  'hbs!modules/post/templates/editOne'
],

function(Backbone, EditOneTemplate){
  'use strict';
  return Backbone.Marionette.ItemView.extend({
    template: EditOneTemplate
  });
});
