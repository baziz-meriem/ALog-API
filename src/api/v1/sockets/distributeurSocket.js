
//const {updateDistributeur}= require('../services/resourceManagement/distributeurService');

const distributeurHandler=async (socket,data)=>{

            socket.to(socket.idClient).emit('distributeur', data);
        }
module.exports = distributeurHandler;