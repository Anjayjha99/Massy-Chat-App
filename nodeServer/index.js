
const io = require('socket.io')(3000);

const users = {};

io.on('connection', (socket) =>{
    socket.on('new-user-joined', names =>{
        users[socket.id] = names;
        socket.broadcast.emit('user-joined', names);
    })
    socket.on('sended' , message =>{
        socket.broadcast.emit('recieve' , {message: message , names: users[socket.id]})
    });
    socket.on('disconnect' , message =>{
        socket.broadcast.emit('leave' , users[socket.id])
        delete users[socket.id];
    });
})