define([
  "text!templates/TopicsTemplate.html",
  "helpers/BaseView",
  "collections/TopicsCollection",
  "underscore"
],
function(template, BaseView, TopicsCollection, _) {

  "use strict";

  return BaseView.extend({
    template: _.template(template),

    initialize: function(args) {
      this.collection = new TopicsCollection(args);
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
