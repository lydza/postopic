var mongoose = require("mongoose");

mongoose.connect("mongodb://postopic:password@ds053658.mongolab.com:53658/postopic");

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback () {
  console.log('Connected to database.');
});

module.exports = mongoose.connection;
