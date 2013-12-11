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
      posts: [],
      topic: {
        name: "",
        author: "",
        dateUpdated: "",
        dateCreated: "",
        _id: "",
        __v: 0
      }
    },
  
    url : function() {
      // Important! It's got to know where to send its REST calls. 
      // In this case, POST to '/donuts' and PUT to '/donuts/:id'
      return this.id ? '/api/topics/' + this.id : '/api/topics';
    } 
  });

});
