define([
  "text!templates/PostTemplate.html",
  "helpers/BaseView",
  "models/PostModel",
  "underscore"
],
function(template, BaseView, PostModel, _) {

  "use strict";

  return BaseView.extend({
    template: _.template(template),

    initialize: function(args) {
      console.log(args.id);
      this.post = new PostModel(args);
      this.post.fetch({
        success: function(post, response) {
          console.log(post.toJSON());
          // TODO Figure out how to export this topics variable outside of 
          // this and use it in the serialize method.
        }
      });
    },

    serialize: function(){
      return {};
    }
  });

});
