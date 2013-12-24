define([
  'backbone',
  'hbs!modules/post/templates/editOne'
],

function(Backbone, EditOneTemplate){

  return Backbone.Marionette.ItemView.extend({
    template: EditOneTemplate
  });
});
