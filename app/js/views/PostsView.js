define([
  "text!templates/post/PostsTemplate.html",
  "helpers/BaseView",
  "underscore"
],
function(template, BaseView, _) {

  "use strict";

  return BaseView.extend({
    template: _.template(template),

    initialize: function() {
      this.listenTo(this.collection, "reset", this.render);
      this.collection.fetch();
    },

    serialize: function(){}

  });

});
