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
        name: "Bubble Gum",
        author: "Lidza",
        dateUpdated: "2013-12-04T17:06:13.189Z",
        dateCreated: "2013-12-03T22:02:37.020Z",
        _id: "529e54fd4bf5345d1f000001",
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
