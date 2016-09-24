var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', defaultResponse);
io.on('connection', callbackConnectIO);
http.listen(1234, listenToWhat);

function defaultResponse(req, res){
  res.sendFile(__dirname + '/index.html');
}

function callbackConnectIO(socket) {
  console.log('a user connected');
  socket.on('chat message', chatMessage);
  socket.on('disconnect', callbackDisconnectIO);
}

function chatMessage(msg){
  io.emit('chat message', msg);
}

function callbackDisconnectIO() {
  console.log('user disconnected');
}

function listenToWhat(){
  console.log('listening on *:1234');
}
