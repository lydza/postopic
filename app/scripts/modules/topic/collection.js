define([
  'backbone',
  'modules/topic/model'
],

function(Backbone, Model){

  return Backbone.Collection.extend({
    initialize: function() {
      console.log("initialize a Topics collection");
    },
    model: Model,
    url: '/api/topics/'
  });
});
