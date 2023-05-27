const { sendToken, comparePassword } = require('../../middlewares/utils');
const { getAcByEmail} = require('../../services/auth/acService');
const {  validateEmail, validatePassword } = require('../../validators/inputValidation');
const bcrypt = require('bcrypt');
const crypto = require("crypto");

const login = async (req, res) => {
  const { email, password } = req.body;
    // checking if ac has given password and email both
    if (!email || !password) {
        return res.status(400).json({ status: 'Bad Request', message: 'Please Enter Email & Password' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    // call the validateEmail and validatePassword functions
    const valideAc = validateEmail(email) && validatePassword(password) ;
    // if there is an error, return a 400 status code
    if (!valideAc) {
        return res.status(400).json({ status: 'Bad Request', message: "provided ac is not valid" });
    }
    // call the service to get the ac by email
    const ac = await getAcByEmail(email);
    // return the ac
    if (!ac) {
        return res.status(404).json({ status: 'Not Found', message: 'AC not found, Invalid Email or Password' });
    }
    //compare between entered password and the one retrieved
    const isPasswordMatched = await comparePassword(password,ac.mot_de_passe)
    if (!isPasswordMatched) {
        return res.status(401).json({ status: 'Not Found', message: 'AC not found, Invalid Password' });
    }
    //send auth token
    sendToken(ac,"AC", 200, res);

   // return res.status(200).json({ status: 'success', data: ac });
}


// Logout Ac
const logout = async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  };

module.exports = {
    login,
    logout

}