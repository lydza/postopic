define([
  'backbone',
  'hbs!modules/post/templates/showAll',
  'modules/post/views/showOneInAll'
],

function(Backbone, ShowAllTemplate, ShowOneInAllView){
  'use strict';
  return Backbone.Marionette.CompositeView.extend({
    template: ShowAllTemplate,
    itemView: ShowOneInAllView,
    itemViewContainer: 'ul',
    initialize: function(){
      console.log('Rendering CompositeView');
    }
  });
});
