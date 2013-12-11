define([
  /* Models */
  "models/TopicModel",
  
  /* Libraries */
  "backbone"
],

function(TopicModel, Backbone) {

  "use strict";

  return Backbone.Collection.extend({
    /* Model:
     *
     * Model this collection is based on. Mapped by this model.
     */
    model: TopicModel,
    
    /* URL:
     *
     * Used when sending requests to the server.
     */
    url: '/api/topics'
  });

});
