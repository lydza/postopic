define([
  "app",  
  "backbone",
  "jquery",
  "views/MainView"
  ],

function(app, BackBone, $, MainView) {

  "use strict";

  var Router = Backbone.Router.extend({

    initialize: function() {
      console.log("Router initialized");
    },

    routes: {
      "": "allRoutes"
    },

    allRoutes: function() {
      var pageInstance = new MainView.render();
      pageInstance.place();
    }
  });

  return Router;

});
