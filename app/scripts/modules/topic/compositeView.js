define([
  'communicator',
  'backbone',
  'modules/topic/itemView'
],

function(Communicator, Backbone, ItemView){

  return Backbone.Marionette.CompositeView.extend({
    template: "#topic-composite",
    itemView: ItemView,
    itemViewContainer: "ul",
    initialize: function(){
      console.log("Rendering CompositeView");
    }
  });
});
