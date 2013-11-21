var mongoose = require("mongoose");

mongoose.connect("mongodb://postopic:password@ds053658.mongolab.com:53658/postopic");

module.exports = mongoose.connection;
