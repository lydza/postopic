define([
  "text!templates/TopicTemplate.html",
  "helpers/BaseView",
  "underscore"
],
function(template, BaseView, _) {

  "use strict";

  return BaseView.extend({
    template: _.template(template),

    initialize: function(args) {
      this.id = args.id;
      // TODO: Find topic in the TopicModel thru this.id and assign it to this.topic.
    },

    serialize: function(){
      return {
        topic: this.topic
      };
    }
  });

});
