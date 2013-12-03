define([
  // Application
  "app",

  // Framework Objects
  "helpers/Message",
  "helpers/MessageBus",
  "helpers/BaseView",

  // Views
  "views/PostsView",
  "views/TopicsView",

  // Libraries
  "underscore",

  // Templates
  "text!templates/DoubleLayoutTemplate.html"
],

// Map dependencies from above array.
function(app, Message, MessageBus, BaseView, TopicsView, PostsView, _, template) {

  "use strict";

  return BaseView.extend({

    template: _.template(template),
    
    initialize: function(options) {
      this.topics = options.topics;
      this.posts = options.posts;
    },

    postRender: function() {

      // Listen for the pageChange event, which will tell us which page this is
      // We load different subViews, depending on which page this layout
      // represents
      this.listenTo(MessageBus, Message.PageChange, function(){
        this.addSubView({
          name: "TopicsView",
          viewType: TopicsView,
          container: '.side-bar',
          options: {
            collection: this.topics
          }
        });
        this.addSubView({
          name: "PostsView",
          viewType: PostsView,
          container: '.content',
          options: {
            collection: this.posts
          }
        });
      });
    }
  });
});
