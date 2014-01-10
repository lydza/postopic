define([
  /* Libraries */
  'communicator',

  /* Module's Model and Collection */
  'modules/post/model',
  'modules/post/collection',

  /* Module's Router */
  'modules/post/router/object',
  'modules/post/router/controller',

  /* Module's Views */
  'modules/post/views/showAll',
  'modules/post/views/showOneInAll',
  'modules/post/views/showOne',
  'modules/post/views/editOne',
  'modules/post/views/deleteOne',
  'modules/post/views/createOne'
],

function(Communicator, Model, Collection, RouterObject, RouterController, ShowAllView, ShowOneInAllView, ShowOneView, EditOneView, DeleteOneView, CreateOneView){
  'use strict';
  return function(App){

    /* This creates the Post Module. The module is like a sub-application in
     * the application. The module usually starts with the App
     * (startWithParent) but you can disable that. Everything that is declared
     * directly under the Post namespace, is available outside the module
     * declaration. For example: Post.Model is available outside the
     * declaration. But if we made a 'var x', it would not be.
     *
     * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.module.md#module-definitions]
     */
    App.module('Post', function(Post, Application, Backbone, Marionette, $, _){
      Post.Model = Model;
      Post.Collection = Collection;
    });
    
    /* This creates the Post.View Module (or Submodule). Has all the same 
     * properties as a module. They are there to create hierarchy.
     *
     * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.module.md#defining-sub-modules-with--notation]
     */
    App.module('Post.View', function(View, Application, Backbone, Marionette, $, _){
      View.ShowAll = ShowAllView;
      View.ShowOneInAll = ShowOneInAllView;
      View.ShowOne = ShowOneView;
      View.EditOne = EditOneView;
      View.DeleteOne = DeleteOneView;
      View.CreateOne = CreateOneView;
    });

    /* This creates the Post.Router Module (or Submodule). Has all the same 
     * properties as a module. They are there to create hierarchy.
     *
     * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.module.md#defining-sub-modules-with--notation]
     */
    App.module('Post.Router', function(Router, Application, Backbone, Marionette, $, _){
      Router.Object = RouterObject;
      Router.Controller = RouterController(Application);
    });
    
    /* 
     * This creates an initializer that executes before the application gets
     * initlalized.
     *
     * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md#adding-initializers]
     *
     * The Post.Router.Object is the Marionette.AppRouter object.
     * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.approuter.md]
     *
     * The Post.Router.Controller is a hash with key:value pairs. The key is
     * the name of the function's alias and the value is the function to be
     * executed.
     * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.approuter.md]
     */
    App.on('initialize:before',function(){
        console.log('Got the router');
        var PostRouter = new App.Post.Router.Object({
          controller: App.Post.Router.Controller
        });
      });
  };
});
