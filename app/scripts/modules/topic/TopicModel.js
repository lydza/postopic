define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a Topic model");
		},

    defaults : {
      posts: [],
      topic: {
        name: "",
        author: "",
        dateUpdated: "",
        dateCreated: "",
        _id: "",
        __v: 0
      }
    },

    url : function() {
      return this.id ? '/api/topics/' + this.id : '/api/topics';
    } 

    });
});