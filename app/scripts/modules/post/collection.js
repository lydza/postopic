define([
  /* Libraries */
  'backbone',
  /* Model that this collection is based on */
  'modules/post/model'
],

function(Backbone, Model){
  'use strict';
  /*
   * Returns a Backbone Collection that is based on the Post Model.
   * 
   * [http://backbonejs.org/#Collection]
   */
  return Backbone.Collection.extend({
    initialize: function() {
      console.log('initialize a Posts collection');
    },
    model: Model,
    url: '/api/posts'
  });
});
