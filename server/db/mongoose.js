var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
};
