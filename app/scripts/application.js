define([
	'backbone',
	'communicator',
	'modules/post/PostModule',
	'modules/topic/TopicModule',
	'hbs!tmpl/welcome'
],

function( Backbone, Communicator, PostModule, TopicModule, Welcome_tmpl ) {
    'use strict';

	var welcomeTmpl = Welcome_tmpl;
  var MainRouter = function(){};
	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({});

	/* Add initializers here */
	App.addInitializer( function () {
		document.body.innerHTML = welcomeTmpl({ success: "CONGRATS!" });
		Communicator.mediator.trigger("APP:START");
	});
	
	App.module("post", PostModule);
	App.module("topic", TopicModule);

  var AppRouter = function(){
    return Backbone.Marionette.AppRouter.extend({

      initialize: function() {console.log('Router initialized.');},
       
      routes: {"test": "testingRoutes"},
  
      testingRoutes: function(){console.log("Routes work. Whoot!!");}
  
    });
  };
  
  App.Router = AppRouter;

	return App;
});
