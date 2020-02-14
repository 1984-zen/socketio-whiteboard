const Room =  require('./classes/Room');
let roomInfo = new Room(1);

const express = require('express');
const app = express();
const socketio = require('socket.io')

// app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(3000);
console.log('listening port 3000')
const io = socketio(expressServer, {
    path: '/socket.io',
    serveClient: true
});

  io.on('connection', (socket) => {
    console.log(`${socket.id} has join room ${roomInfo.roomId}`)
    
    socket.on('joinRoom', (roomToJoin) => {
      socket.join(roomToJoin);
      socket.emit('historyCatchUp', roomInfo.history)
    })
    // socket.emit('welcome', 'welcome to the websocket server!')
    // socket.on('message', (msg) => {
    //   console.log(msg)
    //   socket.broadcast.emit('boardcast', msg)
    // })
    
    setInterval(function() {
    socket.on('newDraw', (draw) => {
      roomInfo.addDrawing(draw)
      console.log(roomInfo.history)
      socket.broadcast.emit('showToClients', draw)
      }, 33);
    })


    // //接受畫布作業訊息
    // socket.on('test', function(data){
    //   console.log(data);
    //   //將畫布作業訊息傳給其他線上的人
    //   socket.emit('fromServer', data);
    // });

    // socket.on('ppap', (data)=> {
    //   socket.broadcast.emit('fromServer', data);
    // })

    socket.on('disconnect', function(){
      console.log('Client Disconnected');
    });
})