define([
  'backbone',
  'hbs!modules/topic/templates/deleteOne'
],

function(Backbone, DeleteOneTemplate){
  'use strict';
  return Backbone.Marionette.ItemView.extend({
    template: DeleteOneTemplate
  });
});
