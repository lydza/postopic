define(
[],

function() {

  "use strict";

  return function(Module, App, Backbone, Marionette, $, _){
     var Router = Backbone.Router.extend({

    initialize: function() {
      console.log('Router initialized.');
    },
     
    routes: {
      "": "testingRoutes"
    },

    testingRoutes: function(){
      console.log("Routes work. Whoot!!");
    }

    return Router;  
  };

});
