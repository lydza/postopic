define([
  // Application
  "app",

  // Framework Objects
  "helpers/Message",
  "helpers/MessageBus",
  "helpers/BaseView",

  // Views
  "views/post/PostsView",
  "views/topic/TopicsView",

  // Libraries
  "underscore",

  // Templates
  "text!templates/layouts/DoubleLayoutTemplate.html"
],

// Map dependencies from above array.
function(app, Message, MessageBus, BaseView, TopicsView, PostsView, _, template) {

  "use strict";

  return BaseView.extend({

    template: _.template(template),

    postRender: function() {

      // Listen for the pageChange event, which will tell us which page this is
      // We load different subViews, depending on which page this layout
      // represents
      this.listenTo(MessageBus, Message.PageChange, function(){
        
        console.log("Topics: " + this.topics + "Posts: " + this.posts);
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
