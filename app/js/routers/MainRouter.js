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
  "helpers/MessageBus",
  
  /* Collections */
  "collections/PostsCollection",
  "collections/TopicsCollection",
  
  /* Models */
  "models/PostModel",
  "models/TopicModel"
  ],

function(app, BackBone, $, SingleLayout, DoubleLayout, Message, MessageBus, PostsCollection, TopicsCollection, PostModel, TopicModel) {

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

      /* Make the pageName lowercase */
      
      var pageName = page.toLowerCase();
      
      /* 
       * Initialize idOrCreate to be the options.id as a default. Not all views will use it. 
       * TODO: Clean up this code.
       */
      
      if((typeof idOrCreate !== 'undefined') &&(idOrCreate.toLowerCase() === 'create')){
        pageName = pageName + ' create';
        this.renderAndPlace(pageName);
      } 
      if((typeof idOrCreate !== 'undefined') && (pageName === 'topics')){
        this.getData('topic', idOrCreate);
      } 
      if((typeof idOrCreate !== 'undefined') && (pageName === 'posts')){
        this.getData('post', idOrCreate);
      }
      if((typeof idOrCreate === 'undefined') && (pageName === 'topics')){
        this.getData(pageName);
      }
      if((typeof idOrCreate === 'undefined') && (pageName === 'posts')){
        this.getData(pageName);
      }
      if(pageName === 'index'){
        this.getData(pageName);
      }
      
    },
    
    /* getData:
     *
     * The function that gets the data for all pages then renders and places 
     * them on the page.
     *
     * It takes two vars: type and id. The type is the type of page we need to 
     * render. The type of page is used to figure out the kind of data we want 
     * to get. The id is the id of the data being retrieved (if applicable). 
     * After getting the data, it sends the type variable and the data to the 
     * renderAndPlace function.
     *
     */
    
    getData: function(type, id){
      var data;
      
      switch (type) {
      
        case "index":
          {
            var topicsData = new TopicsCollection();

            topicsData.fetch({
              error: function(collection, response, options){
                this.renderAndPlace({
                  error: "There was an error getting the topics collection from the database."
                });
              },
              success: function(collection, response, options){
                var topics = [];
                _.each(collection.toJSON(), function(topic){
                  topics.push(topic);
                }.bind(this));
                
                var postsData = new PostsCollection();
        
                postsData.fetch({
                  error: function(collection, response, options){
                    this.renderAndPlace({
                      error: "There was an error getting the posts collection from the database."
                    });
                  },
                  success: function(collection, response, options){
                    var posts = [];
                    _.each(collection.toJSON(), function(post){
                      posts.push(post);
                    }.bind(this));
                    this.renderAndPlace(type, {
                      el: '#main',
                      posts: posts,
                      topics: topics
                    });
                  }.bind(this)
                });
              }.bind(this)
            });
          }

          break;
        case "topics":
          {
            data = new TopicsCollection();
        
            data.fetch({
              error: function(collection, response, options){
                this.renderAndPlace({
                  error: "There was an error getting the topics collection from the database."
                });
              },
              success: function(collection, response, options){
                var topics = [];
                _.each(collection.toJSON(), function(topic){
                  topics.push(topic);
                }.bind(this));
                this.renderAndPlace(type, {
                  el: '#main',
                  collection: topics
                });
              }.bind(this)
            });
          }
          break;
        case "topic":
          {
            data = new TopicModel({id: id});
        
            data.fetch({
              error: function(model, response, options){
                this.renderAndPlace({
                  error: "There was an error getting this topic model from the database."
                });
              },
              success: function(model, response, options){
                this.renderAndPlace(type, {
                  el: '#main',
                  model: model.toJSON()
                });
              }.bind(this)
            });
        
          }
          break;
        case "posts":
         {
            data = new PostsCollection();
        
            data.fetch({
              error: function(collection, response, options){
                this.renderAndPlace({
                  error: "There was an error getting the posts collection from the database."
                });
              },
              success: function(collection, response, options){
                var posts = [];
                _.each(collection.toJSON(), function(post){
                  posts.push(post);
                }.bind(this));
                this.renderAndPlace(type, {
                  el: '#main',
                  collection: posts
                });
              }.bind(this)
            });
          
          }
          break;
        case "post":
          {
            data = new PostModel({id: id});
            
            data.fetch({
              error: function(model, response, options){
                this.renderAndPlace({
                  error: "There was an error getting this topic model from the database."
                });
              },
              success: function(model, response, options){
                this.renderAndPlace(type, {
                  el: '#main',
                  model: model
                });
              }.bind(this)
            });
            
          }
          break;
        }
    },
    
    /* renderAndPlace:
     *
     * The function that gets called after the data gets returned from the server.
     *
     * It takes two vars: page and options. The page is the type of page we want to 
     * render and options is a hash that holds the options to be passed into the layout.
     *
     */
     
    renderAndPlace: function(page, options){
      /* I don't know enough about the MessageBus and Message variables. >_<
       * TODO: Learn more about it.
       */
       
      // Trigger the `pageBeforeChange` event in the MessageBus
      // This informs the existing views to destroy themselves (releasing all
      // reference to them).
      
      MessageBus.trigger(Message.PageBeforeChange, page);

      /* This pageInstance variable will become the view */
      var pageInstance;      
      
      /* This helps display a different page depending on the page. The 
       * index view displays the double layout (two-sided layout) and the 
       * single layout displays the single layout (one-sided layout). 
       *
       * The render function returns the object with the HTML generated. It is 
       * not put into the DOM just yet.
       */
      
      switch (page) {
        case "index":
          pageInstance = new DoubleLayout(options).render();
          break;
        case "topics":
        case "topic":
        case "topics create":
        case "posts":
        case "post":
        case "posts create":
          pageInstance = new SingleLayout(options).render();
          break;
        default:
          pageInstance = new DoubleLayout(options).render();
      }

      // Direct the layout to remove itself on a `pageBeforeChange` event
      
      pageInstance.listenTo(MessageBus, Message.PageBeforeChange, function() {
        pageInstance.destroy();
      });

      // Trigger the `pageChange` event in the MessageBus
      // This causes our layouts to add their subViews
      
      MessageBus.trigger(Message.PageChange, page);

      /* Places the pageInstance into the dom. The place method places it into 
       * the dom.
       */
       
      pageInstance.place();

    }


  });

  return Router;

});
