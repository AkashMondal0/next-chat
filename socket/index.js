const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());


const socketIO = require('socket.io')(http, {
  cors: {
    origin: "*"
  }
});


socketIO.on('connection', (socket) => {

  // user --------------------------------------
  socket.on('user_connect', (user) => {
    socket.join(user.id);
    console.log('user connect', user.id);
  });

  // user chat list -------------------------------
  socket.on('user_chat_list', (_data) => {
    const { receiverId, senderId, data } = _data;

    socket.join(receiverId);
    socket.join(senderId);
    socketIO.to(senderId).emit('user_chat_list', data);
    socketIO.to(receiverId).emit('user_chat_list', data);
  });

  // message --------------------------------------
  socket.on('message_for_user', (_data) => {
    const { receiverId, senderId, data } = _data;

    socket.join(receiverId);
    socket.join(senderId);
    socketIO.to(senderId).emit('message_for_user', data);
    socketIO.to(receiverId).emit('message_for_user', data);
  });

  socket.on('message_for_user_seen', (_data) => {
    const { receiverId, senderId, data } = _data;
    socket.join(receiverId);
    socketIO.to(receiverId).emit('message_for_user_seen', _data);
  });

  // typing --------------------------------------
  socket.on('_typing', (_data) => {
    const { receiverId, senderId, conversationId, typing } = _data;
    socket.join(receiverId);
    socketIO.to(receiverId).emit('_typing', _data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

app.get('/', (req, res) => {
  res.send('chat socket v1.0.0');
});

http.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});