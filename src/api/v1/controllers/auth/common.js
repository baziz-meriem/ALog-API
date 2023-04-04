const { sendToken, comparePassword, sendEmail, getResetPasswordCode } = require('../../middlewares/utils');
const { getAcByEmail, resetAcPassword , updateAcResetCode } = require('../../services/auth/acService');
const { getAgentByEmail } = require('../../services/auth/common');
const { getAllAcs } = require('../../services/profileManagement/acService');
const {  validateEmail, validatePassword } = require('../../validators/inputValidation');
const bcrypt = require('bcrypt');

const getAgent = async (req, res) => {
  const { email } = req.body;
    // call the validateEmail 
    const valideAgent = validateEmail(email) ;
    // if there is an error, return a 400 status code
    if (!valideAgent) {
        return res.status(400).json({ status: 'Bad Request', message: "provided agent is not valid" });
    }
    // call the service to get the agent role by email
    const agent = await getAgentByEmail(email);
    // return the role
    if (!agent) {
        return res.status(404).json({ status: 'Not Found', message: 'Agent not found, Invalid Email' });
    }
  return res.status(200).json({ status: 'success', role: agent });
}


module.exports = {
    getAgent
}