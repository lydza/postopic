define([
  'backbone',
  'modules/post/model'
],

function(Backbone, Model){
  'use strict';
  return Backbone.Collection.extend({
    initialize: function() {
      console.log('initialize a Posts collection');
    },
    model: Model,
    url: '/api/posts'
  });
});
