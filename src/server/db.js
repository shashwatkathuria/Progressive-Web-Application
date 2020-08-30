const Mongoose = require('mongoose');
const config = require('../config/config.js').module;

// Connecting MongoDB database with required options
Mongoose.connect(config.database.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = Mongoose.connection;

// If connection successful
db.once('open', function callback() {
  console.log("Connection with database succeeded.");
});

// If error
db.on('error', console.error.bind(console, 'connection error'));

exports.db = db;
