define([
  'backbone',
  'hbs!modules/topic/templates/showOneInAll'
],

function(Backbone, ShowOneInAllTemplate){
  'use strict';
  return Backbone.Marionette.ItemView.extend({
    template: ShowOneInAllTemplate
  });
});
