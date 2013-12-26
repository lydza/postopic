define([
  'backbone',
  'hbs!modules/post/templates/ShowAll',
  'modules/post/views/showOneInAll'
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
