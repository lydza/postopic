define([
  'backbone',
  'modules/post/itemView'
],

function(Backbone, ItemView){

  return Backbone.Marionette.CompositeView.extend({
    template: "#post-composite",
    itemView: ItemView,
    itemViewContainer: "ul",
    initialize: function(){
      console.log("Rendering CompositeView");
    }
  });
});
