define([
  /* Libraries */
  "underscore",
  
  /* Helpers */
  "helpers/BaseView",
  
  /* Model that this view renders */
  "models/PostModel",
  
  /* Template */
  "text!templates/TopicTemplate.html",
  "text!templates/TopicEditTemplate.html",
  "text!templates/TopicDeleteTemplate.html",
  "text!templates/PostCreateTemplate.html"
],
function(_, BaseView, PostModel, mainTemplate, editTemplate, deleteTemplate, postCreateTemplate) {

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
    template: _.template(mainTemplate),
    
    /* Initialize:
     *
     * Gets called as soon as the view is created.
     *
     * args is the hash that is passed in from the .addSubView() 
     * method. The hash has the Topic model data stored in args.model. So 
     * all we have to do is save it in this view and pass it to the serialize method.
     */
    initialize: function(args) {
      this.model     = args.model;
      this.edit      = _.template(editTemplate);
      this.del       = _.template(deleteTemplate);
      this.newPost   = _.template(postCreateTemplate);
      this.modelJSON = this.model.toJSON();
    },
    
    /* Events:
     *
     * Events that are being listened to in this view
     *
     * The hash's keys are the events, and their values are the functions that 
     * will be called when those events happen.
     * 
     */
    events: {
      "click .edit"   : "editTopic",
      "click .delete" : "deleteTopic",
      "click .addPost": "addPost"
    },
    
    /* editTopic:
     *
     * Gets called when the 'edit' class on the page is clicked.
     *
     * Displays the TopicEditTemplate, and captures the result of the form, 
     * and updates the model with that data.
     */
    editTopic: function(){
      $("#topic").html(
        this.edit(this.serialize())
      );
      $('form').submit(function(event){
        event.preventDefault();
        
        this.model.save({
          name   : $("#name").val(),
          author : $("#author").val(),
        },
        
        { 
          success: function(){
            console.log('This topic has been updated.');
            window.location.href = '/topics/' + this.modelJSON.id;
          }.bind(this)
        });
      }.bind(this));
    },
    
    /* deleteTopic:
     *
     * Gets called when the 'delete' class on the page is clicked.
     *
     * Displays the TopicDeleteTemplate, and captures the submit action of the 
     * form, and deletes the model when its clicked.
     */
    deleteTopic: function(){
      $("#topic").html(
        this.del(this.serialize())
      );
      $('form').submit(function(event){
        event.preventDefault();
        
        this.model.destroy({ 
          success: function(){
            console.log('This topic has been deleted.');
            window.location.href = '/topics';
          }.bind(this)
        });
      }.bind(this));
    },
    
    /* addPost:
     *
     * Gets called when the 'addPost' class on the page is clicked.
     *
     * Displays the PostCreateTemplate, and captures the result of the form, 
     * and creates a new model with that data.
     */
    addPost: function(){
      $("#topic").html(
        this.newPost(this.serialize())
      );
      
      $('form').submit(function(event){
        event.preventDefault();
        
        var newPostModel = new PostModel({
          name    : $("#name").val(),
          author  : $("#author").val(),
          text    : $("#text").val(),
          topicId : this.modelJSON.id
        });
        
        newPostModel.save(newPostModel.attributes, {
          success: function(){
            window.location.href = '/topics/' + this.modelJSON.id;
          }.bind(this)
        });
        
      }.bind(this));
    },
    
    /* Serialize:
     *
     * Function that returns the data to be put into the template.
     *
     * The model in this view is already properly formatted to be 
     * rendered. So it gets returned as-is.
     */
    serialize: function(){
      console.log(this.modelJSON);
      return {
        topic: this.modelJSON
      };
    }
  });

});
