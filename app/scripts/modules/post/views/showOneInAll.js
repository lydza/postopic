define([
  'backbone',
  'hbs!modules/post/templates/showOneInAll'
],

function(Backbone, ShowOneInAllTemplate){

  return Backbone.Marionette.ItemView.extend({
    template: ShowOneInAllTemplate
  });
});
