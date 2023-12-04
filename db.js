// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nivel2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
