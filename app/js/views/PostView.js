define([
  /* Libraries */
  "underscore",
  
  /* Helpers */
  "helpers/BaseView",
  
  /* Model that this view renders */
  "models/PostModel",
  
  /* Template */
  "text!templates/PostTemplate.html"
],
function(_, BaseView, PostModel, template) {

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
     * function. This creates a new TopicsCollection and fetches its data from 
     * the server.
     */
    initialize: function(args) {
      this.post = new PostModel(args);
      this.post.fetch({
        success: function(post, response) {
          console.log(post.toJSON());
          // TODO Figure out how to export this topics variable outside of 
          // this and use it in the serialize method.
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
