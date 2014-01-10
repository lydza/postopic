define([
  /* Libraries */
  'backbone',
  /* Model that this collection is based on */
  'modules/topic/model'
],

function(Backbone, Model){
  'use strict';
  /*
   * Returns a Backbone Collection that is based on the Topic Model.
   * 
   * [http://backbonejs.org/#Collection]
   */
  return Backbone.Collection.extend({
    initialize: function() {
      console.log('initialize a Topics collection');
    },
    model: Model,
    url: '/api/topics/'
  });
});
