define([
	'backbone',
	'jquery',
	'communicator',
	'modules/post/module',
	'modules/topic/module',
	'helpers/loadingView'
],

function( Backbone, $, Communicator, PostModule, TopicModule, LoadingView ) {
  'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
	  mainRegion: '#main-region'
	});

  Communicator.reqres.setHandler('application', function(){
    return App;
  });

  PostModule(App);
  TopicModule(App);

	/* Add initializers here */
	App.addInitializer( function () {
		Communicator.mediator.trigger('APP:START');
	});

	var triggerPageChange = function(url)
	{
	  var topic;
	  var post;
	  App.mainRegion.show(new LoadingView());
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
