/* jshint node:true */

var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  id: String,
  name: String,
  text: String,
  author: String,
  date: Date,
  topic: Number,
  influence: Object
});

postSchema.methods.onCreate = function() {
  console.log('The post "' + this.name + '" was created. dang!');
};

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
