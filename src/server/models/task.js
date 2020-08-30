const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema({
  username: String,
  description: String,
  deadline: Date
}, { timestamps: true });

module.exports = mongoose.model('Task', Task);
