define([
  "text!templates/PostTemplate.html",
  "helpers/BaseView",
  "underscore"
],
function(template, BaseView, _) {

  "use strict";

  return BaseView.extend({
    template: _.template(template),

    initialize: function(args) {
      this.id = args.id;
      // TODO: Find post in the PostModel thru this.id and assign it to this.post.
    },

    serialize: function(){
      return {
        post: this.post
      };
    }
  });

});
