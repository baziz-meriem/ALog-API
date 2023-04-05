const { sendToken, comparePassword, sendEmail, getResetPasswordCode } = require('../../middlewares/utils');
const { getAcByEmail, resetAcPassword , updateAcResetCode } = require('../../services/auth/acService');
const { getAllAcs } = require('../../services/profileManagement/acService');
const {  validateEmail, validatePassword } = require('../../validators/inputValidation');
const bcrypt = require('bcrypt');

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



// Forgot Password
const forgotPassword = async (req, res) => {
    // call the validateEmail function
    const valideAc = validateEmail(req.body.email)  ;
    // if there is an error, return a 400 status code
    if (!valideAc) {
        return res.status(400).json({ status: 'Bad Request', message: "provided ac email is not valid" });
    }
  
    // call the service to get the ac by email
    let ac = await getAcByEmail(req.body.email);
    // return error if the ac is not found
    if (!ac) {
        return res.status(404).json({ status: 'Not Found', message: 'AC not found, Invalid Email' });
    }  
    // Get ResetPassword code
    let {resetCode , user:acUpdated } = getResetPasswordCode(ac);
  //update the resetPassword code and expirePassword code 
    acUpdated = await updateAcResetCode(req.body.email, acUpdated);
  
    const message = `Your password reset code is :- \n\n ${resetCode} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: acUpdated.email,
        subject: `Password Recovery`,
        message,
      });
      return res.status(200).json({   
        success: true,
        message: `Email sent to ${acUpdated.email} successfully`,
     });

    } catch (error) {
        acUpdated.resetPasswordCode = undefined;
        acUpdatedc.resetPasswordExpire = undefined;
  
        acUpdated = await updateAcResetCode(req.body.email, acUpdated);
  
        return res.status(500).json({ status: 'Error', message: error });

    }
  };

const resetPassword = async (req, res) => {
    // getting reset code
    const resetPasswordCode = req.body.resetPasswordCode;
  
    const ac = await getAcByEmail(req.body.email);

  
    if (!ac) {
        return res.status(400).json({ status: 'Bad request', message: "Email not valid" });
    }
    if (ac.resetPasswordCode!==resetPasswordCode) {
      return res.status(400).json({ status: 'Bad request', message: "Reset Password code is invalid or has been expired" });
  }
  
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ status: 'Bad Request', message: "Password does not password" });
    }
    ac.password = req.body.password;
    ac.resetPasswordCode = "";
    ac.resetPasswordExpire = undefined;
  
    const acUpdated = await resetAcPassword(ac.id, ac);
  
    sendToken(acUpdated,"AC", 200, res);
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
    forgotPassword,
    resetPassword,
    logout

}