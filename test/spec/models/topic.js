(function() {
	'use strict';

	var root = this;

	root.define([
		'models/topic'
		],
		function( Topic ) {

			describe('Topic Model', function () {

				it('should be an instance of Topic Model', function () {
					var topic = new Topic();
					expect( topic ).to.be.an.instanceof( Topic );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );