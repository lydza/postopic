define([
  'communicator',
  'modules/post/model',
  'modules/post/collection',
  'modules/post/itemView',
  'modules/post/compositeView',
  'modules/post/routerObject',
  'modules/post/routerController'
],

function(Communicator, Model, Collection, ItemView, CompositeView, RouterObject, RouterController){
  return function(App){
    var routerController = RouterController(App);

    App.module("Post", function(Post, Application, Backbone, Marionette, $, _){
      /* Set up some Variables used in this module */
      
      Post.Model = Model;
      Post.Collection = Collection;
      Post.ItemView = ItemView;
      Post.CompositeView = CompositeView;
      // TODO: Create a createview
      /* Initialize the router */
      App.on("initialize:before",function(){
        console.log("Got the router");
        var PostRouter = new RouterObject({
          controller: routerController
        });
      });
    });
  };
});
