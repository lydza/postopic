define([
  /* Libraries */
	'backbone',
	'jquery',
	'communicator',
  /* Modules */
	'modules/post/module',
	'modules/topic/module'
],

function( Backbone, $, Communicator, PostModule, TopicModule) {
  'use strict';
  /* 
   * This is App object is the central object for the entire application. 
   * Everything else will derive from this object.
   * 
   * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md]
   */
	var App = new Backbone.Marionette.Application();

	/* 
	 * Adds regions to App here. Views will be loaded into these views. The 
	 * regions are aliased by the keys in the hash. And the values are DOM 
	 * elements. The DOM element must be on the page.
	 * 
	 * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.region.md#defining-an-application-region]
	 */
	
	App.addRegions({
	  mainRegion: '#main-region'
	});

  /* 
   * Initializes the Post and Topic Modules. The modules are attached to the 
   * App object.
   * 
   * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.module.md#basic-usage]
   */
  PostModule(App);
  TopicModule(App);

	/* 
	 * This adds an initializer to the application. This function gets called 
   * when the application gets initialized. It gets added to the list of
   * initializers for the application
	 * 
	 * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md#adding-initializers]
	 *
	 * The Communicator's mediator manages application-wide events. It uses 
	 * Backbone.Wreqr's EventAggregator. This code triggers the application-wide 'APP:START' 
	 * event. Other parts of the application can choose to listen to this event.
	 * 
	 * [https://github.com/marionettejs/backbone.wreqr]
	 */
	App.addInitializer( function () {
		Communicator.mediator.trigger('APP:START');
	});

  /*
   * This manages page triggers. It takes in the url being clicked on and 
   * executes an application-wide command based on the url (the 
   * Communicator.command).The Communicator.command is like a set of 
   * application-wide functions where data can be passed as the second argument
   * in the execute function. The second argument is available in the function 
   * that handles the command. It is based on Backbone.Wreqr's Command.
   * 
   * [https://github.com/marionettejs/backbone.wreqr]
   *
   * TODO: Clean this code up. It's kind of a mess
   */
	var triggerPageChange = function(url)
	{
	  var topic;
	  var post;
	  console.log('Trigger Page change');
    if (url === 'topics'){
      Communicator.command.execute('pageChange:topics');
    } else if(url === 'posts'){
      Communicator.command.execute('pageChange:posts');
    } else if (url.indexOf('topic/create') === 0) {
      Communicator.command.execute('pageChange:topic:create');
    } else if ((url.indexOf('topic/') === 0) && (url.indexOf('/delete') > 0)) {
      topic = url.substring(6,url.indexOf('/delete'));
      Communicator.command.execute('pageChange:topic:delete', topic);
    } else if(url.indexOf('topic/') === 0 && url.indexOf('/new_post') > 0) {
      topic = url.substring(6,url.indexOf('/new_post'));
      Communicator.command.execute('pageChange:topic:newPost', topic);
    } else if (url.indexOf('topic/') === 0 && url.indexOf('/show') > 0) {
      topic = url.substring(6,url.indexOf('/show'));
      Communicator.command.execute('pageChange:topic:show', topic);
    } else if (url.indexOf('topic/') === 0 && url.indexOf('/edit') > 0) {
      topic = url.substring(6,url.indexOf('/edit'));
      Communicator.command.execute('pageChange:topic:edit', topic);
    } else if ((url.indexOf('post/') === 0) && (url.indexOf('/delete') > 0)) {
      post = url.substring(5,url.indexOf('/delete'));
      Communicator.command.execute('pageChange:post:delete', post);
    } else if ((url.indexOf('post/') === 0) && (url.indexOf('/show') > 0)) {
      post = url.substring(5,url.indexOf('/show'));
      Communicator.command.execute('pageChange:post:show', post);
    } else if ((url.indexOf('post/') === 0) && (url.indexOf('/edit') > 0)) {
      post = url.substring(5,url.indexOf('/edit'));
      Communicator.command.execute('pageChange:post:edit', post);
    } else{
      console.log('No route');
    }
  };

	/* 
	 * This adds an initializer:after to the application. This function gets called 
   * after the application gets initialized. It gets added to the list of
   * post-initializers for the application
	 * 
	 * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md#adding-initializers]
	 *
	 * This code grabs all the anchor clicks in the application, intercepts their
	 * behaviour, and if it is in the current site, sends the url to the 
	 * triggerPageChange function. It also pushes the url to the browser's 
	 * history.
	 */
	App.on('initialize:after', function(){
    Backbone.history.start({ pushState: true, root: '/' });
    $(document).on('click', 'a:not([data-bypass])', function(evt) {
      var href = $(this).attr('href');
      if (href && href.indexOf('http://localhost:9000/') === 0) {
        evt.preventDefault();
        window.history.pushState(null, null, href);
        triggerPageChange(href.substring(22));
      }
    });
	});

	return App;
});
