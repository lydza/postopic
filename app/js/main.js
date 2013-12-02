require([
  "app",
  "routers/MainRouter",
  "backbone",
  "jquery"

],

function(app, Router, Backbone, $) {

  "use strict";
  app.router = new Router();

  Backbone.history.start({ pushState: true, root: "/" });

  $(document).on("click", "a:not([data-bypass])", function(evt) {
    var href = $(this).attr("href");
    if (href && href.indexOf("#") === 0) {
      evt.preventDefault();
      Backbone.history.navigate(href, true);
    }
  });

});
