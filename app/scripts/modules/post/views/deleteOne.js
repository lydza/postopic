define([
  'backbone',
  'hbs!modules/post/templates/deleteOne'
],

function(Backbone, DeleteOneTemplate){
  'use strict';
  return Backbone.Marionette.ItemView.extend({
    template: DeleteOneTemplate
  });
});
