const { getClientsByMonth,getDistributeursByClient } = require('../../services/stats/statsService');



//Nombre de distributeurs par client

const getDistributeursByClientHandler = async (req, res) => {

  
    const Distributeurs = await getDistributeursByClient(req,res);
    if(!Distributeurs){
        return res.status(500).json({
            status: 'Bad Request',
            message: 'Error while getting Distributeurs number by Client'
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'Distributeurs by clients retrieved successfully',
        data: Distributeurs
    });


}
//statistiques représentant le nombre de nouveaux clients par mois
const getClientsByMonthHandler = async (req, res) => {
    // call the service to get all annonceurs
    const clients = await getClientsByMonth(req,res);
    if(!clients){
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occured while trying to get number of clients created in each month'
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'All clients retrieved successfully',
        data: clients
    });

};





module.exports = {
    getClientsByMonthHandler,
    getDistributeursByClientHandler
}