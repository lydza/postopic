define([
  'backbone',
  'hbs!modules/topic/templates/showAll',
  'modules/topic/views/showOneInAll'
],

function(Backbone, ShowAllTemplate, ShowOneInAllView){
  return Backbone.Marionette.CompositeView.extend({
    template: ShowAllTemplate,
    itemView: ShowOneInAllView,
    itemViewContainer: "ul",
    initialize: function(){
      console.log("Rendering CompositeView");
    }
  });
});
