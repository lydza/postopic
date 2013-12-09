define([
  /* Libraries */
  "underscore",

  /* Helpers */
  "helpers/BaseView",
  
  /* Models */
  "models/TopicModel",

  /* Template */
  "text!templates/TopicCreateTemplate.html"
],
function(_, BaseView, TopicModel, template) {

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
     
    events: {
      'submit form' : 'createTopic'
    },
    
    createTopic: function(event){
      event.preventDefault();
      console.log('This worked!');
      var newTopicModel = new TopicModel({
        name : $("#name").val(),
        author : $("#author").val(),
      });
      newTopicModel.save(newTopicModel.attributes, {
        success: function(){
          window.location.href = '/topics';
        }.bind(this)
      });
    },
    
    template: _.template(template),
  });

});
