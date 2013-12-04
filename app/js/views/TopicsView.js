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
      this.collection.fetch({
        success: function(collection, response) {
          var topics = [];
          _.each(collection.models, function(model) {
            topics.push(model.toJSON());
          });
          
          console.log(topics);
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
