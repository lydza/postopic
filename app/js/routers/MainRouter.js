define([
  "app",  
  "backbone",
  "jquery",
  "views/SingleLayoutView",
  "views/DoubleLayoutView",
  "helpers/Message",
  "helpers/MessageBus",
  "collections/TopicsCollection",
  "collections/PostsCollection"
  ],

function(app, BackBone, $, SingleLayout, DoubleLayout, Message, MessageBus, TopicsCollection, PostsCollection) {

  "use strict";

  var Router = Backbone.Router.extend({

    initialize: function() {
      // create this.topics
      this.topics = new TopicsCollection;
      // create this.posts
      this.posts = new PostsCollection;
    },

    routes: {
      "": "goToPage",
      ":page": "goToPage",
      ":page/:create": "goToPage",
      ":page/:id": "goToPage"
    },

    // This will handle all page cases in this application. If we declared all
    // of our routes individually, we'd end up with a lot of repeated code.
    // Your mileage may vary.
    goToPage: function(page, idOrCreate) {
      // If we do not receive a page argument, just go home
      if (!page || page === "index.html") {
        page = "index";
      }
      
      // Declare a pageInstance that will become our view
      var pageInstance = null;

      // Convert page to Lowercase if not already
      var pageName = page.toLowerCase();

      // All of our views share these common options
      var layoutOptions = {
        el: "#main",
        topics: this.topics,
        posts: this.posts
      };

      if((typeof idOrCreate !== 'undefined') && (idOrCreate.toLowerCase() === 'create')){
        pageName = page + ' create';
      } else if((typeof idOrCreate !== "undefined") && (pageName === 'topics')){
        layoutOptions.id = idOrCreate;
        pageName = 'topic';
      } else if((typeof idOrCreate !== "undefined") && (pageName === 'posts')){
        layoutOptions.id = idOrCreate;
        pageName = 'post';
      }

      // Trigger the `pageBeforeChange` event in the MessageBus
      // This informs the existing views to destroy themselves (releasing all
      // reference to them).
      MessageBus.trigger(Message.PageBeforeChange, pageName);

      // Create a different layout based on the page name
      switch (pageName) {
        case "index":
          pageInstance = new DoubleLayout(layoutOptions).render();
          break;
        case "topics":
        case "topic":
        case "topic create":
        case "posts":
        case "post":
        case "post create":
          pageInstance = new SingleLayout(layoutOptions).render();
          break;
        default:
          pageInstance = new DoubleLayout(layoutOptions).render();
      }

      // Direct the layout to remove itself on a `pageBeforeChange` event
      pageInstance.listenTo(MessageBus, Message.PageBeforeChange, function() {
        pageInstance.destroy();
      });

      // Trigger the `pageChange` event in the MessageBus
      // This causes our layouts to add their subViews
      MessageBus.trigger(Message.PageChange, pageName);

      // Put our complete layout in the DOM
      pageInstance.place();

    }


  });

  return Router;

});
