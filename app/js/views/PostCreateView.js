define([
  /* Libraries */
  "underscore",

  /* Helpers */
  "helpers/BaseView",

  /* Template */
  "text!templates/PostCreateTemplate.html"
],
function(_, BaseView, template) {

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
  });

});
