/* jshint node:true */

var mongoose = require('mongoose');

var topicSchema = mongoose.Schema({
  name: String,
  author: String,
  date: Date
});

topicSchema.methods.onCreate = function() {
  console.log('The topic "' + this.name + '" was created.');
};

var Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
