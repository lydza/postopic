define([
  'communicator',
  'backbone',
  'modules/topic/model'
],

function(Communicator, Backbone, Model){

  return Backbone.Collection.extend({
    initialize: function() {
      console.log("initialize a Topics collection");
    },
    model: Model
  });
});
