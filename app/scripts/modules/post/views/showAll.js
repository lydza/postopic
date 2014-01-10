define([
  /*  Libraries */
  'backbone',
  /* Templates */
  'hbs!modules/post/templates/showAll',
  /* Views */
  'modules/post/views/showOneInAll'
],

function(Backbone, ShowAllTemplate, ShowOneInAllView){
  'use strict';
  /*
   * Returns a Marionette.CompositeView.
   * 
   * template : template that wraps around the collection
   * itemView : view that all items in the collection will use
   * itemViewContainer : container within the template that the collection
   * will be rendered
   * 
   * [https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.compositeview.md]
   */
  return Backbone.Marionette.CompositeView.extend({
    template: ShowAllTemplate,
    itemView: ShowOneInAllView,
    itemViewContainer: 'ul',
    initialize: function(){
      console.log('Rendering CompositeView');
    }
  });
});
