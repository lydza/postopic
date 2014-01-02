define([
  'backbone',
  'hbs!helpers/loadingTemplate'
],

function(Backbone, LoadingTemplate){

  return Backbone.Marionette.ItemView.extend({
    template: LoadingTemplate
  });
});
