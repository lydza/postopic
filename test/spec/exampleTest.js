(function() {
	'use strict';

	var root = this;

	root.define([
		'application',
		'backbone'
		],
		function( App, Backbone ) {

			describe('App Object', function () {
				it('should be an instance of Marionette.App', function () {
					expect( App ).to.be.an.instanceof( Backbone.Marionette.Application );
				});

			});

		});

}).call( this );
