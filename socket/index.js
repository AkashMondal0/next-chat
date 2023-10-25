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

  socket.on('user_connect', (user) => {
    socket.join(user.id);
    console.log('user connect', user.id);
  });

  socket.on('user_chat_list', (_data) => {

    const { receiverId, senderId, data } = _data;

    socketIO.to(senderId).emit('user_chat_list', data);
    socketIO.to(receiverId).emit('user_chat_list', data);
  });

  socket.on('join_room', (data) => {
    socket.join(data.conversationId);
    console.log('user joined room', data.userId);
  });

  socket.on('message', (data) => {
    socket.join(data.conversationId);
    socketIO.to(data.conversationId).emit('room', data);
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