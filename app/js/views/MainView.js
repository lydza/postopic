/*global FileReader */

define([
  "app",
  "views/BaseView",
  "underscore",
  "text!templates/MainTemplate.html"
],

function(app, BaseView, _, template) {

  "use strict";

  return BaseView.extend({

    template: _.template(template)

  });

});
