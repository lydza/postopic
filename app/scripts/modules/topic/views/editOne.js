define([
  'backbone',
  'hbs!modules/topic/templates/editOne'
],

function(Backbone, EditOneTemplate){
  'use strict';
  return Backbone.Marionette.ItemView.extend({
    template: EditOneTemplate
  });
});
