define([
  "text!templates/TopicCreateTemplate.html",
  "helpers/BaseView",
  "underscore"
],
function(template, BaseView, _) {

  "use strict";

  return BaseView.extend({
    template: _.template(template),
  });

});
