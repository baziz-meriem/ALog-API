const disconnectHandler = require('./disconnectSocket');
const distributeurHandler = require('./distributeurSocket');

const socketHandler =(socket) => {
    socket.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('distributeur',(socket,data)=>{
            console.log(data)
            distributeurHandler(socket,data)
        })
        
        socket.on('disconnect', ()=>{
            disconnectHandler(socket)
        });
      }); 
}

module.exports = socketHandler;