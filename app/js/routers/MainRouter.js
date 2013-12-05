define([
  /* Main application */
  "app",
  
  /* Libraries */
  "backbone",
  "jquery",
  
  /* Major page-level layouts */
  "views/SingleLayoutView",
  "views/DoubleLayoutView",
  
  /* Helpers */
  "helpers/Message",
  "helpers/MessageBus"
  ],

function(app, BackBone, $, SingleLayout, DoubleLayout, Message, MessageBus) {

  "use strict";

  var Router = Backbone.Router.extend({

    /* Initialize:
     *
     * Gets called as soon as the router is created.
     *
     */
     
    initialize: function() {
      console.log('Router initialized.');
    },

    /* Routes:
     *
     * Actual routes the application accepts.
     * 
     * The keys are the URL strings that are accepted, and the values are the 
     * functions that are called when the URLs are matched. The ':' symbol in 
     * the URL denotes a variable. That variable gets passed as an argument 
     * into the function in the value.
     *
     */
     
    routes: {
      "": "goToPage",
      ":page": "goToPage",
      ":page/:idOrCreate": "goToPage"
    },

    /* goToPage:
     *
     * The function that gets called for all routes.
     *
     * This is the only function that gets called with all routes (all the 
     * routes' key-value pairs have this value). It accepts the :page and 
     * :idOrCreate variables that are declared in the routes' keys. 
     *
     */
     
    goToPage: function(page, idOrCreate) {
    
      /* The default page is index */
      
      if (!page || page === "index.html") {
        page = "index";
      }
      
      /* This pageInstance variable will become the view */
      
      var pageInstance = null;

      /* Make the pageName lowercase */
      
      var pageName = page.toLowerCase();

      /* Options that are used in our layouts */
      
      var layoutOptions = {
        el: "#main"
      };
      
      /* 
       * Initialize idOrCreate to be the options.id as a default. Not all views will use it. 
       * TODO: Clean up this code.
       */
       
      layoutOptions.id = idOrCreate;
      
      if((typeof idOrCreate !== 'undefined') &&(idOrCreate.toLowerCase() === 'create')){
        pageName = pageName + ' create';
      } 
      if((typeof idOrCreate !== 'undefined') && (pageName === 'topics')){
          pageName = 'topic';
      } 
      if((typeof idOrCreate !== 'undefined') && (pageName === 'posts')){
          pageName = 'post';
      }
      if((typeof idOrCreate === 'undefined') && (pageName === 'topics')){
        pageName = 'topics';
      }
      if((typeof idOrCreate === 'undefined') && (pageName === 'posts')){
        pageName = 'posts';
      }
      
      console.log('Going to page ' + pageName + '.');
      
      /* I don't know enough about the MessageBus and Message variables. >_<
       * TODO: Learn more about it.
       */
       
      // Trigger the `pageBeforeChange` event in the MessageBus
      // This informs the existing views to destroy themselves (releasing all
      // reference to them).
      
      MessageBus.trigger(Message.PageBeforeChange, pageName);

      /* This helps display a different page depending on the pageName. The 
       * index view displays the double layout (two-sided layout) and the 
       * single layout displays the single layout (one-sided layout). 
       *
       * The render function returns the object with the HTML generated. It is 
       * not put into the DOM just yet.
       */
       
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

      /* Places the pageInstance into the dom. The place method places it into 
       * the dom.
       */
       
      pageInstance.place();

    }


  });

  return Router;

});
