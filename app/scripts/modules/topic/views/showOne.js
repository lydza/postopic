define([
  'backbone',
  'hbs!modules/topic/templates/showOne'
],

function(Backbone, ShowOneTemplate){
  'use strict';
  return Backbone.Marionette.ItemView.extend({
    template: ShowOneTemplate
  });
});
