define([
  "text!templates/TopicTemplate.html",
  "helpers/BaseView",
  "models/TopicModel",
  "underscore"
],
function(template, BaseView, TopicModel, _) {

  "use strict";

  return BaseView.extend({
    template: _.template(template),

    initialize: function(args) {
      this.topic = new TopicModel(args);
      this.topic.fetch({
        success: function(topic, response) {
          console.log(topic.toJSON());
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
