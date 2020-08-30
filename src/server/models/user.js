const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  lastestTasksNotified: {
    type: Date,
    default: Date.now
  },
  friends: [{
    type: String
  }]
}, { timestamps: true });

// Username, hash etc related authentication fields and
// handling handled by passport-local-mongoose
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
