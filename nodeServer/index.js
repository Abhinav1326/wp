// const { Server } = require("socket.io")

// const { Socket } = require('socket.io');

// node Server
const io  = require('socket.io')(8888, {
    cors: {
        origin:"http://204.232.175.78",
        methods: ["GET", "POST"]
    }
});

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        console.log("new user", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name:users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });


})
