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
     * args is the hash that is passed in from the .addSubView() 
     * method. The hash has the Post model data stored in args.model. So 
     * all we have to do is save it in this view and pass it to the serialize method.
     */
    initialize: function(args) {
      console.log(args);
      this.model = args.model;
    },
    
    /* Serialize:
     *
     * Function that returns the data to be put into the template.
     *
     * The model in this view is already properly formatted to be 
     * rendered. So it gets returned as-is.
     */
    serialize: function(){
      console.log(this.model);
      return {post: this.model};
    }
  });

});
