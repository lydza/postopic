define([
  // Application
  "app",

  // Framework Objects
  "helpers/Message",
  "helpers/MessageBus",
  "helpers/BaseView",

  // Views
  "views/TopicsView",
  "views/PostsView",
  "views/TopicView",
  "views/PostView",
  "views/TopicCreateView",
  "views/PostCreateView",

  // Libraries
  "underscore",

  // Templates
  "text!templates/SingleLayoutTemplate.html"
],

// Map dependencies from above array.
function(app, Message, MessageBus, BaseView, TopicsView, PostsView, TopicView, PostView, TopicCreateView, PostCreateView, _, template) {

  "use strict";

  return BaseView.extend({

    template: _.template(template),
    
    initialize: function(options) {
      this.topics = options.topics;
      this.posts = options.posts;
      this.id = options.id;
    },

    postRender: function() {

      // Listen for the pageChange event, which will tell us which page this is
      // We load different subViews, depending on which page this layout
      // represents
      this.listenTo(MessageBus, Message.PageChange, function(page){
        console.log(page);
        if (page === "posts") {
          this.addSubView({
            name: "PostsView",
            viewType: PostsView,
            container: '.content',
            options: {}
          });
        } else if (page === "topics") {
          this.addSubView({
            name: "TopicsView",
            viewType: TopicsView,
            container: '.content',
            options: {}
          });
        } else if (page === "topic") {
          this.addSubView({
            name: "TopicView",
            viewType: TopicView,
            container: '.content',
            options: {
              id: this.id
            }
          });
        } else if (page === "post") {
          this.addSubView({
            name: "PostView",
            viewType: PostView,
            container: '.content',
            options: {
              id: this.id
            }
          });
        } else if (page === "topic create") {
          this.addSubView({
            name: "TopicCreateView",
            viewType: TopicCreateView,
            container: '.content',
            options: {}
          });
        } else if (page === "post create") {
          this.addSubView({
            name: "PostCreateView",
            viewType: PostCreateView,
            container: '.content',
            options: {}
          });
        }
      });
    }
  });
});
