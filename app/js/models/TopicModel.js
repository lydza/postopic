define([

  // Libraries
  "backbone"

],

// Map dependencies from above array.
function(Backbone) {

  "use strict";

  // Default model
  return Backbone.Model.extend({
    
    initialize: function(args){
      this.id = args.id;
    },
    defaults : {
      name: 'No Name',
      author: 'Anonymous',
      dateCreated: null,
      dateUpdated: null
    },
  
    url : function() {
      // Important! It's got to know where to send its REST calls. 
      // In this case, POST to '/donuts' and PUT to '/donuts/:id'
      return this.id ? '/api/topics/' + this.id : '/api/topics';
    } 
  });

});
