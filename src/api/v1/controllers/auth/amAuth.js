const prisma = require('../../../../config/dbConfig');
const { sendToken, comparePassword, sendEmail, getResetPasswordCode } = require('../../middlewares/utils');
const { getAmByEmail, resetAmPassword, updateAmResetCode } = require('../../services/auth/amService');
const {  validateEmail, validatePassword } = require('../../validators/inputValidation');

const login = async (req, res) => {
    // retrieve the am from the request
    const { email, password } = req.body;
    // checking if am has given password and email both
    if (!email || !password) {
        return res.status(400).json({ status: 'Bad Request', message: 'Please Enter Email & Password' });
    }
    // call the validateEmail and validatePassword functions
    const valideAm = validateEmail(email) && validatePassword(password) ;
    // if there is an error, return a 400 status code
    if (!valideAm) {
        return res.status(400).json({ status: 'Bad Request', message: "provided am is not valid" });
    }
  
    // call the service to get the am by email
    const am = await getAmByEmail(email);
    // return the am
    if (!am) {
        return res.status(404).json({ status: 'Not Found', message: 'AM not found, Invalid Email or Password' });
    }
    //compare between entered password and the one retrieved
    const isPasswordMatched = await comparePassword(password,am.mot_de_passe)
    if (!isPasswordMatched) {
        return res.status(401).json({ status: 'Not Found', message: 'AM not found, Invalid Password' });
    }
    //send auth token
    sendToken(am, 200, res);

   // return res.status(200).json({ status: 'success', data: ac });
}



// Forgot Password
const forgotPassword = async (req, res) => {
    // call the validateEmail function
    const valideAm = validateEmail(req.body.email)  ;
    // if there is an error, return a 400 status code
    if (!valideAm) {
        return res.status(400).json({ status: 'Bad Request', message: "provided ac email is not valid" });
    }
  
    // call the service to get the ac by email
    let am = await getAmByEmail(req.body.email);
    // return error if the ac is not found
    if (!am) {
        return res.status(404).json({ status: 'Not Found', message: 'AC not found, Invalid Email' });
    }  

  
    // Get ResetPassword code
    let {resetCode , user:amUpdated } = getResetPasswordCode(am);
  //update the resetPassword code and expirePassword code 
    amUpdated = await updateAmResetCode(req.body.email, amUpdated);


    const message = `Your password reset code is :- \n\n ${resetCode} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: amUpdated.email,
        subject: `Password Recovery`,
        message,
      });
      return res.status(200).json({   
        success: true,
        message: `Email sent to ${amUpdated.email} successfully`,
     });

    } catch (error) {
        amUpdated.resetPasswordCode = "";
        amUpdatedc.resetPasswordExpire = undefined;
  
        amUpdated = await updateAmResetCode(req.body.email, amUpdated);
  
        return res.status(500).json({ status: 'Error', message: error });

    }
  };

const resetPassword = async (req, res) => {
    // getting reset code
    const resetPasswordCode = req.body.resetPasswordCode;
  
    const am = await getAmByEmail(req.body.email);
  
    if (!am) {
      return res.status(400).json({ status: 'Bad request', message: "Email not valid" });
    }

    if (am.resetPasswordCode!==resetPasswordCode) {
      return res.status(400).json({ status: 'Bad request', message: "Reset Password code is invalid or has been expired" });
  }
  
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ status: 'Bad Request', message: "Password does not password" });
    }
    am.password = req.body.password;
    am.resetPasswordCode = "";
    am.resetPasswordExpire = undefined;
  
    const amUpdated = await resetAmPassword(am.id, am);
  
    sendToken(amUpdated, 200, res);
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