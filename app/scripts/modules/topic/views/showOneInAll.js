define([
  'backbone',
  'hbs!modules/topic/templates/showOneInAll'
],

function(Backbone, ShowOneInAllTemplate){

  return Backbone.Marionette.ItemView.extend({
    template: ShowOneInAllTemplate
  });
});
