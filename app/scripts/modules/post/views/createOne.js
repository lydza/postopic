define([
  'backbone',
  'hbs!modules/post/templates/createOne'
],

function(Backbone, CreateOneTemplate){

  return Backbone.Marionette.ItemView.extend({
    template: CreateOneTemplate
  });
});
