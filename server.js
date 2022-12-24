const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log("WebSocket Connected...\nID - " + socket.id);

    socket.emit('message', 'Welcome to ChatApp');
    socket.broadcast.emit('message', 'A user has joined the chat');

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    })

    socket.on('chatMessage', (mssg) => {
        io.emit('message', mssg);
    });
});

server.listen(PORT, () => console.log(`Server up and running : ${PORT}`));