define([
  'backbone',
  'hbs!modules/post/templates/deleteOne'
],

function(Backbone, DeleteOneTemplate){

  return Backbone.Marionette.ItemView.extend({
    template: DeleteOneTemplate
  });
});
