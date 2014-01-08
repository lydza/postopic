define([
  'backbone',
  'hbs!modules/post/templates/showOne'
],

function(Backbone, ShowOneTemplate){
  'use strict';
  return Backbone.Marionette.ItemView.extend({
    template: ShowOneTemplate
  });
});
