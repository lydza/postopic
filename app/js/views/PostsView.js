define([
  "text!templates/PostsTemplate.html",
  "helpers/BaseView",
  "collections/PostsCollection",
  "underscore"
],
function(template, BaseView, PostsCollection, _) {

  "use strict";

  return BaseView.extend({
    template: _.template(template),

    initialize: function(args) {
      this.collection = new PostsCollection(args);
      this.listenTo(this.collection, "reset", this.render);      
      this.collection.fetch();
    },

    serialize: function(){
      return {
        collection: this.collection.toJSON()
      };
    }
  });

});
