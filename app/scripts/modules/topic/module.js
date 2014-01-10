define([
  /* Libraries */
  'communicator',

  /* Module's Model and Collection */
  'modules/topic/model',
  'modules/topic/collection',

  /* Module's Router */
  'modules/topic/router/object',
  'modules/topic/router/controller',

  /* Module's Views */
  'modules/topic/views/showAll',
  'modules/topic/views/showOneInAll',
  'modules/topic/views/showOne',
  'modules/topic/views/editOne',
  'modules/topic/views/deleteOne',
  'modules/topic/views/createOne'
],

function(Communicator, Model, Collection, RouterObject, RouterController, ShowAllView, ShowOneInAllView, ShowOneView, EditOneView, DeleteOneView, CreateOneView){
  'use strict';
  return function(App){

    /* This creates the Topic Module. The module is like a sub-application in
     * the application. The module usually starts with the App
     * (startWithParent) but you can disable that. Everything that is declared
     * directly under the Topic namespace, is available outside the module
     * declaration. For example: Topic.Model is available outside the
     * declaration. But if we made a 'var x', it would not be.
     *
     * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.module.md#module-definitions]
     */
    App.module('Topic', function(Topic, Application, Backbone, Marionette, $, _){
      Topic.Model = Model;
      Topic.Collection = Collection;
    });
    
    /* This creates the Topic.View Module (or Submodule). Has all the same 
     * properties as a module. They are there to create hierarchy.
     *
     * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.module.md#defining-sub-modules-with--notation]
     */
    App.module('Topic.View', function(View, Application, Backbone, Marionette, $, _){
      View.ShowAll = ShowAllView;
      View.ShowOneInAll = ShowOneInAllView;
      View.ShowOne = ShowOneView;
      View.EditOne = EditOneView;
      View.DeleteOne = DeleteOneView;
      View.CreateOne = CreateOneView;
    });

    /* This creates the Topic.Router Module (or Submodule). Has all the same 
     * properties as a module. They are there to create hierarchy.
     *
     * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.module.md#defining-sub-modules-with--notation]
     */
    App.module('Topic.Router', function(Router, Application, Backbone, Marionette, $, _){
      Router.Object = RouterObject;
      Router.Controller = RouterController(Application);
    });
    
    /* 
     * This creates an initializer that executes before the application gets
     * initlalized.
     *
     * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md#adding-initializers]
     *
     * The Topic.Router.Object is the Marionette.AppRouter object.
     * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.approuter.md]
     *
     * The Topic.Router.Controller is a hash with key:value pairs. The key is
     * the name of the function's alias and the value is the function to be
     * executed.
     * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.approuter.md]
     */
    App.on('initialize:before',function(){
        console.log('Got the router');
        var TopicRouter = new App.Topic.Router.Object({
          controller: App.Topic.Router.Controller
        });
      });
  };
});
