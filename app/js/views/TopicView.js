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
      this.topic.fetch();
    },

    serialize: function(){
      return {
        topic: this.topic.toJSON()
      };
    }
  });

});
