define([
  'communicator',
  'backbone',
  'modules/post/model'
],

function(Communicator, Backbone, Model){

  return Backbone.Collection.extend({
    initialize: function() {
      console.log("initialize a Posts collection");
    },
    model: Model
  });
});
