define([
  'backbone',
  'hbs!modules/post/templates/createOne'
],

function(Backbone, CreateOneTemplate){
  'use strict';
  return Backbone.Marionette.ItemView.extend({
    template: CreateOneTemplate
  });
});
