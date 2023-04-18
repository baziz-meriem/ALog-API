const disconnectHandler = require('./disconnectSocket');
const distributeurHandler = require('./distributeurSocket');

const socketHandler =(io) => {
    io.use((socket,next)=>{
        if(socket.handshake.auth.idClient){
            const idClient = socket.handshake.auth.idClient;
            socket.idClient=idClient;
            next();
        }else{
            next(new Error('authentication error'));
        }
    })
    io.on('connection', (socket) => {
        console.log('New client connected to room:',socket.idClient);
        socket.join(socket.idClient)
        socket.on('distributeur',async (data)=>{
            await distributeurHandler(socket,data)
        });
        socket.on('disconnect', ()=>{
            disconnectHandler(socket)
        });
    }); 
}

module.exports = socketHandler;