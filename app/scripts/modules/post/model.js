define([
  'backbone'
],

function(Backbone){

  return Backbone.Model.extend({
  	initialize: function(arg) {
  	  this.id = arg
   		console.log("initialize a Post model");
  	},
    defaults : {
      post: {
        name: "",
        author: "",
        text: "",
        topicId: "",
        date: "",
        _id: "",
        __v: 0
      },
      topic: {
        name: "",
        author: "",
        dateUpdated: "",
        dateCreated: "",
        _id: "",
        __v: 0
      }
    },
    url : function() {
      return this.id ? '/api/posts/' + this.id : '/api/posts'; 
    }
  });
});
