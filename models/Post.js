/* jshint node:true */

var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  name: String,
  text: String,
  author: String,
  date: Date,
  topic_id: String
});

postSchema.methods.onCreate = function() {
  console.log('The post "' + this.name + '" by ' + this.author + ' was created at ' + this.date + '.');
};

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
