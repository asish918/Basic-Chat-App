const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const formatMessage = require('./utils/messages')
const {userJoin, getCurrentUser} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const botName = 'Admin Bot';

const PORT = 8000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log("WebSocket Connected...\nID - " + socket.id);

    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!!'));
        
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));
    });
    
    
    socket.on('chatMessage', (mssg) => {
        io.emit('message', formatMessage('USER', mssg));
    });

    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'));
    })
});

server.listen(PORT, () => console.log(`Server up and running : ${PORT}`));