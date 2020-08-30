const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat = new Schema({
  sender: String,
  message: String,
  receiver: String,
  // Read by receiver or not
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Chat', Chat);
