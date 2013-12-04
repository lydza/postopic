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
      this.post.fetch();
    },

    serialize: function(){
      return {
        post: this.post.toJSON()
      };
    }
  });

});
