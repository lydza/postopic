define([
	'backbone',
	'models/post'
],
function( Backbone, Post ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Posts collection");
		},

		model: Post
		
	});
});
