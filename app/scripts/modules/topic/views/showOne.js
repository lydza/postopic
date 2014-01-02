define([
  'backbone',
  'hbs!modules/topic/templates/showOne'
],

function(Backbone, ShowOneTemplate){

  return Backbone.Marionette.ItemView.extend({
    template: ShowOneTemplate
  });
});
