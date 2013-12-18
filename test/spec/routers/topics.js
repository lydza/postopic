(function() {
	'use strict';

	var root = this;

	root.define([
		'routers/topics'
		],
		function( Topics ) {

			describe('Topics Router', function () {

				it('should be an instance of Topics Router', function () {
					var topics = new Topics();
					expect( topics ).to.be.an.instanceof( Topics );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );