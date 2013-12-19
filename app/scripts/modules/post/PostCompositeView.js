define([
  'backbone',
  'modules/post/PostView'
], 

function(Backbone, PostView){
  return Backbone.Marionette.CompositeView.extend({
    template: "#post-composite",
    itemView: PostView,
    itemViewContainer: "ul",

    initialize: function(){
      console.log("Rendering CompositeView");
    }
  });
});
