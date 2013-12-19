define([
  'communicator'
],

function(Communicator){

  return Backbone.Marionette.ItemView.extend({
    template: "#post-item"
  });
});
