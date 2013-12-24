define([
	'backbone',
	'jquery',
	'communicator',
	'modules/post/module',
	'modules/topic/module'
],

function( Backbone, $, Communicator, PostModule, TopicModule ) {
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
	
	App.on("initialize:after", function(){
    Backbone.history.start({ pushState: true, root: "/" });
    $(document).on("click", "a:not([data-bypass])", function(evt) {
      var href = $(this).attr("href");
      if (href && href.indexOf("http://localhost:9000/") === 0) {
        evt.preventDefault();
        console.log(href.substring(22));
        Communicator.command.execute("pageChange:"+href.substring(22));
      }
    });
	});
  
  Communicator.command.setHandler("pageChange:posts", function(){
    console.log("The Post command was executed");
  });
	return App;
});
