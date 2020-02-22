const Room = require('./classes/Room');
let roomInfo = new Room(1);

const express = require('express');
const app = express();
const socketio = require('socket.io')

const expressServer = app.listen(3000);
console.log('listening port 3000')
const io = socketio(expressServer, {
  path: '/socket.io',
  serveClient: true
});
io.on('connection', (socket) => {
  console.log(`${socket.id} has join room ${roomInfo.roomId}`)
  socket.setMaxListeners(Infinity); //new add
  socket.on('joinRoom', (roomToJoin) => {
    socket.join(roomToJoin);

  })
  // test msg
  // socket.emit('welcome', 'welcome to the websocket server!')
  // socket.on('message', (msg) => {
  //   console.log(msg)
  //   socket.broadcast.emit('boardcast', msg)
  // })

  socket.on('newDraw', (draw) => {
    console.log(roomInfo.history)
    socket.broadcast.emit('showToClients', draw)
  })

  socket.on('returnDraw', (returnDraw) => {
    socket.broadcast.emit('returnToClient', returnDraw)
  })

  socket.on('disconnect', function () {
    console.log('Client Disconnected');
  });
})