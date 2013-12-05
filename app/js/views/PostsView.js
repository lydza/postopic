define([
  /* Libraries */
  "underscore",
  
  /* Helpers */
  "helpers/BaseView",
  
  /* Collection that this view renders */
  "collections/PostsCollection",
  
  /* Template */
  "text!templates/PostsTemplate.html"
],
function(_, BaseView, PostsCollection, template) {

  "use strict";
  
  /* BaseView is an extended Backbone view. */
  return BaseView.extend({
  
    /* Template:
     *
     * The underscore template function returns a function that takes in a 
     * hash with the variables the template accepts. It returns the HTML 
     * version with the variables in the hash placed.
     *
     */
    template: _.template(template),
    
    /* Initialize:
     *
     * Gets called as soon as the view is created.
     *
     * args is the options hash that as passed in from the .addSubView() 
     * function. This creates a new PostsCollection, listens to its reset 
     * event to re-render it, and fetches its data from the server.
     * TODO: Remove the args variable. Does nothing.
     */
    initialize: function(args) {
      this.collection = new PostsCollection(args);
      this.listenTo(this.collection, "reset", this.render);      
      this.collection.fetch({
        success: function(collection, response) {
          var posts = [];
          _.each(collection.models, function(model) {
            posts.push(model.toJSON());
          });
          
          console.log(posts);
          // TODO Figure out how to export the topics variable to be used 
          // outside of this and use it in the serialize method.
        }
      });
    },

    /* Serialize:
     *
     * Function that returns the data to be put into the template.
     *
     * After the data is retrieved from the fetch call it needs to be returned 
     * here. Needs to be returned in a format that the template can process.
     */
    serialize: function(){
      return {};
    }
  });

});
