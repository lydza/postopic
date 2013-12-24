define([
  'backbone',
  'hbs!modules/post/templates/showOne'
],

function(Backbone, ShowOneTemplate){

  return Backbone.Marionette.ItemView.extend({
    template: ShowOneTemplate
  });
});
