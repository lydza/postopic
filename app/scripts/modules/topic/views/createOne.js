define([
  'backbone',
  'hbs!modules/topic/templates/createOne'
],

function(Backbone, CreateOneTemplate){

  return Backbone.Marionette.ItemView.extend({
    template: CreateOneTemplate
  });
});
