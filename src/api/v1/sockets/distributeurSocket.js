const {validateDistributeur}= require('../validators/profileValidation');
const {updateDistributeur}= require('../services/resourceManagement/distributeurService');

const distributeurHandler=async (socket,data)=>{
    // validate the data before sending it to the client and the database
    const valideDistributeur = validateDistributeur(data);
    // if the data is valid, send it to the client and the database
    if(valideDistributeur){
        const distributeur = await updateDistributeur(data.id,data);
        if(distributeur){
            socket.to(socket.idClient).emit('distributeur', valideDistributeur);
        }
    }
}

module.exports = distributeurHandler;