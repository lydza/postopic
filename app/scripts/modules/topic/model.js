define([
  /* Libraries */
  'backbone'
],

function(Backbone){
  'use strict';
  /*
   * Returns a Backbone Model for the data that comes back from the server.
   * 
   * [http://backbonejs.org/#Model]
   */
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
