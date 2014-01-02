define([
  'backbone',
  'hbs!modules/topic/templates/editOne'
],

function(Backbone, EditOneTemplate){

  return Backbone.Marionette.ItemView.extend({
    template: EditOneTemplate
  });
});
