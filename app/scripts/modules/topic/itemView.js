define([
  'communicator'
],

function(Communicator){

  return Backbone.Marionette.ItemView.extend({
    template: "#topic-item"
  });
});
