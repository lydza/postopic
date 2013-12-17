(function() {
	'use strict';

	var root = this;

	root.define([
		'models/post'
		],
		function( Post ) {

			describe('Post Model', function () {

				it('should be an instance of Post Model', function () {
					var post = new Post();
					expect( post ).to.be.an.instanceof( Post );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );