var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', callbackConnectIO);

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


http.listen(1234, function(){
  console.log('listening on *:1234');
});
