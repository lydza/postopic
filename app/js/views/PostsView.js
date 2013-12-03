define([
  "text!templates/PostsTemplate.html",
  "helpers/BaseView",
  "underscore"
],
function(template, BaseView, _) {

  "use strict";

  return BaseView.extend({
    template: _.template(template),

    initialize: function(args) {
      this.collection = args.collection;
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
