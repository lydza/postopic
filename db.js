var mongoose = require("mongoose");

mongoose.connect("mongodb://storytime:password@ds053718.mongolab.com:53718/storytime");

module.exports = mongoose.connection;
