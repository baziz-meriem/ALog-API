const {disconnectHandler} = require('./disconnectSocket');

const socketHandler =(socket) => {
    socket.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('disconnect', ()=>{
            disconnectHandler(socket)
        });
      }); 
}

module.exports = socketHandler;