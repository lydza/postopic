define([
  /* Main application */
  "app",
  
  /* Libraries */
  "backbone",
  "underscore",
  "jquery"
],

function(app, Backbone, _, $) {

  "use strict";

  var BaseView = Backbone.View.extend({
    
    /* constructor:
     *
     * Gets called as soon as the view is created.
     *
     * Sets up the object.
     */
    constructor: function() {
      this.subViews = {};
      Backbone.View.apply( this, arguments );
    },
    
    /* 
     * addSubView:
     * 
     * This adds a subview in the template of this BaseView 
     *
     * The subViewSpec hash that is being passed into the addSubView is 
     * formatted as follows:
     *   - name:      the alias for the subView
     *   - viewType:  the type of view to be added. Should extend BaseView.
     *   - container: area of the template that it will render in. 
     *                Accepts jQuery-type identifiers.
     *   - options:   hash that holds the variables that will be called 
     *                when the new viewType is instantiated. If there are 
     *                key-value pairs in here, they will available in the 
     *                initialize function of the view.
     *
     */
    addSubView: function( subViewSpec ) {
      subViewSpec.options = subViewSpec.options || {};
      subViewSpec.options.el = this.$template.find(subViewSpec.container).get(0);
      var subView = new subViewSpec.viewType( subViewSpec.options )
        .render()
        .place();
      this.subViews[ subViewSpec.name ] = subView;
      return subView;
    },
    
    /* destroy:
     *
     * Removes the view and its subsequent subViews. And removes all of its 
     * event listers.
     */
    destroy: function() {
      this.destroySubViews();
      this.stopListening();
      this.$el.empty();
      return this;
    },
    
    /* destroySubViews:
     *
     * Removes the subViews from this BaseView. The subViews are stored in a 
     * hash and the .destroy() call is called one by one.
     */
    destroySubViews: function() {
      var subViews = this.subViews;
      for ( var id in subViews ) {
        if ( subViews.hasOwnProperty(id) ) {
          subViews[ id ].destroy();
          delete subViews[ id ];
        }
      }
      return this;
    },

    /* place:
     *
     * Places this view into the HTML.
     */
    place: function() {
      this.$el.html(this.$template);
      this.postPlace();
      return this;
    },
    
    /* postPlace:
     *
     * Something to do after the item is placed in the DOM.
     */
    postPlace: function() {},
    
    /* postRender:
     *
     * Something to do after the item is rendered.
     */
    postRender: function() {},

    /* render:
     *
     * Renders the view. Different from placing it in that it gets it ready 
     * to be placed on the page. It serializes the data and passes it into 
     * the template. Has to be called before place()
     */
    render: function() {
      this.$template = $(this.template(this.serialize()));
      this.postRender();
      return this;
    },
    
    /* serialize:
     *
     * Removes the view and its subsequent subViews. And removes all of its 
     * event listers.
     */
    serialize: function(){}

  });

  return BaseView;

});
