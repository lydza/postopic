(function() {
	'use strict';

	var root = this;

	root.define([
		'routers/posts'
		],
		function( Posts ) {

			describe('Posts Router', function () {

				it('should be an instance of Posts Router', function () {
					var posts = new Posts();
					expect( posts ).to.be.an.instanceof( Posts );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );