/* jshint node:true */

var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  name: String,
  text: String,
  author: String,
  date: Date,
  topic_id: Number
});

postSchema.methods.onCreate = function() {
  console.log('The post "' + this.name + '" was created.');
};

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
