define([
  /* Libraries */
  'backbone',
  'backbone.marionette'
],
function( Backbone ) {
  'use strict';
  
  /* This is a Marionette.Controller object. In this application, it pretty
   * much acts as a hash to access the methods.
   * 
   * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.controller.md]
   */
  var Communicator = Backbone.Marionette.Controller.extend({
    initialize: function() {
      console.log('initialize a Communicator');

      /* These objects are based on the The Backbone.Wreqr objects. They manage
       * events, commands, and req/res for the application. Different parts of
       * the application should only communicate thru these functions
       * 
       * this.mediator : application-wide events. Events can be triggered, and
       *  different parts of the application can listen to them.
       *
       * this.reqres : application-wide data transfer. A part of the
       * application can return certain data when another part of the 
       * application requests it.
       *
       * this.command : applicaton-wide commands. One part of the application 
       * can execute a command, and another part can have a callback for it.
       * You can also pass the callback(s) parameters.
       * 
       * [https://github.com/marionettejs/backbone.wreqr]
       */
      this.mediator = new Backbone.Wreqr.EventAggregator();

      this.reqres = new Backbone.Wreqr.RequestResponse();

      this.command = new Backbone.Wreqr.Commands();
    }
  });

  return new Communicator();
});
