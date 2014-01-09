define([
  'backbone'
],

function(Backbone){
  'use strict';
  return Backbone.Model.extend({
    initialize: function(arg) {
      this.slug=arg;
      console.log('initialize a Topic model');
    },
    defaults : {
      posts: [],
      topic: {
        name: '',
        author: '',
        dateUpdated: '',
        dateCreated: '',
        _id: '',
        __v: 0
      }
    },
    url : function() {
      return this.slug ? '/api/topic/' + this.slug : '/api/topic';
    }
  });
});
