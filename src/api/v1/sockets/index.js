const disconnectHandler = require('./disconnectSocket');
const distributeurHandler = require('./distributeurSocket');

const socketHandler =(socket) => {
    socket.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('distributeur',async (data)=>{
            await distributeurHandler(socket,data)
        })
        
        socket.on('disconnect', ()=>{
            disconnectHandler(socket)
        });
      }); 
}

module.exports = socketHandler;