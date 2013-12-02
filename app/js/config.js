/* global require */

require.config({

  deps: ["main"],

  paths: {
    app: "app",
    backbone: "lib/backbone/backbone-1.1.0-min",
    jquery: "lib/jquery/jquery-1.10.2-min",
    underscore: "lib/lodash/lodash-2.4.0-min"
  },

  shim: {
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    }
  }
});
