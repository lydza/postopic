define([
  'backbone',
  'hbs!helpers/loadingTemplate'
],

function(Backbone, LoadingTemplate){
  'use strict';
  return Backbone.Marionette.ItemView.extend({
    template: LoadingTemplate
  });
});
