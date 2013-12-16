/* jshint node:true */

var mongoose = require('mongoose');

var topicSchema = mongoose.Schema({
  name: String,
  slug: String,
  author: String,
  dateCreated: Date,
  dateUpdated: Date
});

topicSchema.methods.onCreate = function() {
  console.log('The topic "' + this.name + '" by ' + this.author + ' was created on ' + this.dateCreated + '.');
};

var Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
