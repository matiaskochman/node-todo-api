var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
};
