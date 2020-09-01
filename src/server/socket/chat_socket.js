const socket = require('socket.io');
const Chat = require('../models/chat.js');

module.exports = function (server, sessionMiddleware) {

  const io = socket(server);

  // Socket middleware to get session user
  const socketSessionMiddleware = function(socket, next) {
      sessionMiddleware(socket.request, {}, next);
  }
  io.use(socketSessionMiddleware);

  io.on('connection', function (socket) {

    // Marks the messages sent by sender and received by user(receiver)
    socket.on('receiverReadSenderMessages', async function(sender) {
      // If user session
      if (socket.request.session.passport) {
        const user = socket.request.session.passport.user;
        socket.username = user;
        // Mark relevant messages as read
        await Chat.updateMany({ sender: sender, receiver: user }, { $set: { read: true }});
      }
    });

    socket.on('getAllMessageHistory', async function() {
      // If user session
      if (socket.request.session.passport) {
        const user = socket.request.session.passport.user;
        socket.username = user;
        // Getting all user chats
        const userChats = await Chat.find({ $or:[{ sender: user }, { receiver: user }] });
        // Emitting them to user
        io.to(socket.id).emit('getAllMessageHistory', userChats);
      }
    });

    socket.on('newMessage', async function(messageDetails) {
      // If user session
      if (socket.request.session.passport) {
        const user = socket.request.session.passport.user;
        socket.username = user;

        // Creating new chat message and saving it
        let chat = new Chat({
          sender: user,
          message: messageDetails.message,
          receiver: messageDetails.receiver
        });
        await chat.save();

        // Getting all socket ids
        let socketIds = Object.keys(io.sockets.sockets);
        let receiverSocketId = null;
        // Searching for receiver socket if online
        socketIds.forEach(socketId => {
          // If there is any socket with the same username as that of receiver
          if (io.sockets.sockets[socketId].username === messageDetails.receiver) {
            receiverSocketId = socketId;
          }
        });

        // Emitting message to sender as successfully sent
        io.to(socket.id).emit('newMessage', chat);
        // Emitting message to receiver also if receiver is online
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('newMessage', chat);
        }
      }
    });
  });

  return io;
}
