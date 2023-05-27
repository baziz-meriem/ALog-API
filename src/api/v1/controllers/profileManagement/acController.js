const { createAc, getAcById, getAllAcs} = require('../../services/profileManagement/acService');
const {  validateId } = require('../../validators/inputValidation');

const getAllHandler = async (req, res) => {
    
    const acs = await getAllAcs();
   
    if (!acs) {
        return res.status(500).json({ status: 'Internal Server Error', message: 'An error occured while retrieving the ACs' });
    }
    
    return res.status(200).json({ status: 'success', data: acs });
}

const getOneHandler = async (req, res) => {
 
    const { id } = req.params;
   
    const valideId = validateId(id);
    
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
   
    const ac = await getAcById(valideId);
  
    if (!ac) {
        return res.status(404).json({ status: 'Not Found', message: 'AC not found' });
    }
    return res.status(200).json({ status: 'success', data: ac });
}

const postHandler = async (req, res) => {
  
    const { nom, prenom, email, password, numTel} = req.body;
    
  
    const newAc = await createAc({ nom, prenom, email, password, numTel});

    return res.status(201).json({ status: 'OK', data: newAc });

}



module.exports = {
    getAllHandler,
    getOneHandler,
    postHandler
}