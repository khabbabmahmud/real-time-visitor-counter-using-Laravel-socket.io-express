
const express = require('express');

const app = express();


const server = require('http').createServer(app);
server.listen(3000, () => {
    console.log('Server is running');
});

const io = require('socket.io')(server, {
    cors: { origin: "*" }
});

var count = 0;

io.on('connection', (socket) => {
    count++;
    io.sockets.emit('socket_io_counter', { count: count });

    socket.on('disconnect', (socket) => {
        count--;
        io.sockets.emit('socket_io_counter', { count: count });

    });
});

