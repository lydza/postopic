define([
  "app",
  "backbone",
  "underscore",
  "jquery"
],

function(app, Backbone, _, $) {

  "use strict";

  var BaseView = Backbone.View.extend({
    
    // Gets called as soon as a new BaseView is created.
    constructor: function() {
      this.subViews = {};
      Backbone.View.apply( this, arguments );
    },

    // Adds a view within this view, i.e. a subView.
    // When it is called, this is what needs to passed into it:
    // {
    //   name: "Alias for the view",
    //   viewType: The actual Backbone View associated with this subView,
    //   container: ".the-div/span/id that this view will be rendered in",
    //   options: {
    //     hash: holds options for this view. Gets passed into the viewType variable. Therefore one view can have different ways of rendering depending on the options passed into this hash. Can be empty.
    //   }
    // }
    addSubView: function( subViewSpec ) {
      subViewSpec.options = subViewSpec.options || {};
      subViewSpec.options.el = this.$template.find(subViewSpec.container).get(0);
      var subView = new subViewSpec.viewType( subViewSpec.options )
        .render()
        .place();
      this.subViews[ subViewSpec.name ] = subView;
      return subView;
    },
    
    // Takes this view off the page.
    destroy: function() {
      this.destroySubViews();
      this.stopListening();
      this.$el.empty();
      return this;
    },
    
    // Removes the subviews of this view
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

    // Places this view onto the page
    place: function() {
      this.$el.html(this.$template);
      this.postPlace();
      return this;
    },
    
    // Something to do after the item has been placed on the page.
    postPlace: function() {},
    
    // Something to do after the item has been rendered
    postRender: function() {},

    // Renders the view. Different from placing it in that it gets it ready to be placed on the page. It serializes the data for the template. Must be called before place()
    render: function() {
      this.$template = $(this.template(this.serialize()));
      this.postRender();
      return this;
    },
    
    // Used to serialize data for the template
    serialize: function(){}

  });

  return BaseView;

});
