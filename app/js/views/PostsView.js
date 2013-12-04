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

    serialize: function(){
      return {};
    }
  });

});
