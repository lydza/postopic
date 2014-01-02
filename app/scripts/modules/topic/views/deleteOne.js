define([
  'backbone',
  'hbs!modules/topic/templates/deleteOne'
],

function(Backbone, DeleteOneTemplate){

  return Backbone.Marionette.ItemView.extend({
    template: DeleteOneTemplate
  });
});
