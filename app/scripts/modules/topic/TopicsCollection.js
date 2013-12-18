define([
	'backbone',
	'models/topic'
],
function( Backbone, Topic ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Topics collection");
		},

		model: Topic
		
	});
});
