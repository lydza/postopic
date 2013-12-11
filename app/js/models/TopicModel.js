define([

  /* Libraries */
  "backbone"

],

function(Backbone) {

  "use strict";

  return Backbone.Model.extend({
    /* Initialize:
     *
     * Gets called as soon as a new model is created.
     *
     * args has the ID of the model. This ID is the personal idetifier of this 
     * model. It is used in the url when getting its data.
     */ 
    initialize: function(args){
      this.id = args.id;
    },
    
    /* Defaults:
     *
     * Default values for the model
     *
     * Data that fills in the blanks of the data that comes in.
     */
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
  
    /* URL:
     *
     * Used when sending requests to the server.
     */
    url : function() {
      return this.id ? '/api/topics/' + this.id : '/api/topics';
    } 
  });

});
