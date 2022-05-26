//var ip = require("ip");
//const serverTarget = 'http://' + ip.address();
const serverTarget = 'http://localhost';
const path = require('path');
const appPort = 3000;
const express = require('express');
const socket = require('socket.io');

const app = express();

app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(appPort, function () {
    let port = server.address().port;
    console.log(`Example Express WebSocket app listening at ${serverTarget}:${port}`)
    console.log("Click above URL to launch the html client.\n")
});

const io = socket(server);

io.on('connection',function(socket){
    console.log('socket connected id=', socket.id);

    socket.on('message', function(data){
        io.sockets.emit('message', data);
    });

    socket.on('eyf_typing', function(data){
        socket.broadcast.emit('eyf_typing', data);
    });
});
