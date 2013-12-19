define([
	'backbone',
	'communicator',
	'modules/post/PostModule',
	'modules/topic/TopicModule'
],

function( Backbone, Communicator, PostModule, TopicModule ) {
  'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
	  mainRegion: "#main-region"
	});
  
  Communicator.reqres.setHandler("application", function(){
    return App;
  });
  
  PostModule();
  TopicModule();
  
	/* Add initializers here */
	App.addInitializer( function () {
		Communicator.mediator.trigger("APP:START");
	});	

	return App;
});
