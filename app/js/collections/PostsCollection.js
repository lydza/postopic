define([
  /* Models */
  "models/PostModel",
  
  /* Libraries */
  "backbone"
],

function(PostModel, Backbone) {

  "use strict";

  return Backbone.Collection.extend({

    /* Model:
     *
     * Model this collection is based on. Mapped by this model.
     */
    model: PostModel,
    
    /* URL:
     *
     * Used when sending requests to the server.
     */
    url: '/api/posts'
  });

});
