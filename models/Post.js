/* jshint node:true */

var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  name: String,
  slug: String,
  text: String,
  author: String,
  topicId: String,
  date: Date
});

postSchema.methods.onCreate = function() {
  console.log('The post "' + this.name + '" by ' + this.author + ' was created at ' + this.date + '.');
};

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
