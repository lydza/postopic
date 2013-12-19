define([
  'backbone'
],

function(Backbone){
  return Backbone.Marionette.ItemView.extend({
    template: "#post-item"
  });
});
