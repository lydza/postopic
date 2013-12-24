define([
  'backbone',
  'modules/topic/itemView'
],

function(Backbone, ItemView){

  return Backbone.Marionette.CompositeView.extend({
    template: "#topic-composite",
    itemView: ItemView,
    itemViewContainer: "ul",
    initialize: function(){
      console.log("Rendering CompositeView");
    }
  });
});
