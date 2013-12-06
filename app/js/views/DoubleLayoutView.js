define([
  /* Main Application */
  "app",

  /* Helpers */
  "helpers/Message",
  "helpers/MessageBus",
  "helpers/BaseView",

  /* Views that will become this view's sub-views */
  "views/PostsView",
  "views/TopicsView",

  /* Libraries */
  "underscore",

  /* Template */
  "text!templates/DoubleLayoutTemplate.html"
],

function(app, Message, MessageBus, BaseView, TopicsView, PostsView, _, template) {

  "use strict";

  /* BaseView is an extended Backbone view. */

  return BaseView.extend({
    
    /* Template:
     *
     * The underscore template function returns a function that takes in a 
     * hash with the variables the template accepts. It returns the HTML 
     * version with the variables in the hash placed.
     *
     */

    template: _.template(template),
    
    /* Initialize:
     *
     * Gets called as soon as the layout is created.
     *
     * The options are the layoutOptions that were passed in from the router.
     */
     
    initialize: function(options) {
      this.topics = options.topics;
      this.posts = options.posts;
      console.log('Double Layout View initialized.');
    },

    /* postRender:
     *
     * Gets called after the orginal template gets rendered. In this case, the 
     * function is added items to the rendered template.
     *
     */
     
    postRender: function() {

      // Listen for the pageChange event, which will tell us which page this is
      // We load different subViews, depending on which page this layout
      // represents
      this.listenTo(MessageBus, Message.PageChange, function(){
      
        /* 
         * This part decides which view to render based on the page requested.
         * 
         * this.addSubView() adds a subview in the template of the current 
         * BaseView that is being returned by this file. The addSubView 
         * function is declared in Baseview.
         *
         * The hash that is being passed into the addSubView is formatted as 
         * follows:
         *   - name:      the alias for the subView
         *   - viewType:  the type of view to be added. Should extend BaseView.
         *   - container: area of the template that it will render in. 
         *                Accepts jQuery-type identifiers.
         *   - options:   hash that holds the variables that will be called 
         *                when the new viewType is instantiated. If there are 
         *                key-value pairs in here, they will available in the 
         *                initialize function of the view.
         *
         */
        console.log(this.topics);
        console.log(this.posts);
        this.addSubView({
          name: "TopicsView",
          viewType: TopicsView,
          container: '.left',
          options: {
            collection: this.topics
          }
        });        
        this.addSubView({
          name: "PostsView",
          viewType: PostsView,
          container: '.right',
          options: {
            collection: this.posts
          }
        });
        
        console.log('Finished adding subViews.');
      });
    }
  });
});
