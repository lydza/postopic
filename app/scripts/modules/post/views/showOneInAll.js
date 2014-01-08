define([
  'backbone',
  'hbs!modules/post/templates/showOneInAll'
],

function(Backbone, ShowOneInAllTemplate){
  'use strict';
  return Backbone.Marionette.ItemView.extend({
    template: ShowOneInAllTemplate
  });
});
