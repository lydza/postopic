define([
  'backbone',
  'modules/topic/model'
],

function(Backbone, Model){
  'use strict';
  return Backbone.Collection.extend({
    initialize: function() {
      console.log('initialize a Topics collection');
    },
    model: Model,
    url: '/api/topics/'
  });
});
