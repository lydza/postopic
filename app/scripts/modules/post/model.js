define([
  'backbone'
],

function(Backbone){
  'use strict';
  return Backbone.Model.extend({
    initialize: function(arg) {
      this.slug = arg;
      console.log('initialize a Post model');
    },
    defaults : {
      post: {
        name: '',
        author: '',
        text: '',
        topicId: '',
        slug: '',
        date: '',
        _id: '',
        __v: 0
      },
      topic: {
        name: '',
        author: '',
        slug: '',
        dateUpdated: '',
        dateCreated: '',
        _id: '',
        __v: 0
      }
    },
    url : function() {
      return this.slug ? '/api/post/' + this.slug : '/api/post';
    }
  });
});
