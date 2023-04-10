const prisma = require('../../../../config/dbConfig');
const { sendToken, comparePassword, sendEmail, getResetPasswordCode } = require('../../middlewares/utils');
const { resetAdmPassword, getAdmByEmail, updateAdmResetCode } = require('../../services/auth/admService');
const {  validateEmail, validatePassword } = require('../../validators/inputValidation');

const login = async (req, res) => {
    // retrieve the adm from the request
    const { email, password } = req.body;
    // checking if adm has given password and email both
    if (!email || !password) {
        return res.status(400).json({ status: 'Bad Request', message: 'Please Enter Email & Password' });
    }
    // call the validateEmail and validatePassword functions
    const valideAdm = validateEmail(email) && validatePassword(password) ;
    // if there is an error, return a 400 status code
    if (!valideAdm) {
        return res.status(400).json({ status: 'Bad Request', message: "provided adm is not valid" });
    }
  
    // call the service to get the adm by email
    const adm = await getAdmByEmail(email);
    // return the adm
    if (!adm) {
        return res.status(404).json({ status: 'Not Found', message: 'ADM not found, Invalid Email or Password' });
    }
    //compare between entered password and the one retrieved
    const isPasswordMatched = await comparePassword(password,adm.mot_de_passe)
    if (!isPasswordMatched) {
        return res.status(401).json({ status: 'Not Found', message: 'ADM not found, Invalid Password' });
    }
    //send auth token
    sendToken(adm,"ADM", 200, res);

   // return res.status(200).json({ status: 'success', data: ac });
}



// Forgot Password
const forgotPassword = async (req, res) => {
    // call the validateEmail function
    const valideAdm = validateEmail(req.body.email)  ;
    // if there is an error, return a 400 status code
    if (!valideAdm) {
        return res.status(400).json({ status: 'Bad Request', message: "provided ac email is not valid" });
    }
  
    // call the service to get the ac by email
    let adm = await getAdmByEmail(req.body.email);
    // return error if the ac is not found
    if (!adm) {
        return res.status(404).json({ status: 'Not Found', message: 'AC not found, Invalid Email' });
    }  

  
    // Get ResetPassword code
    let {resetCode , user:admUpdated } = getResetPasswordCode(adm);
  //update the resetPassword code and expirePassword code 
  admUpdated = await updateAdmResetCode(req.body.email, admUpdated);


  
    const message = `Your password reset code is :- \n\n ${resetCode} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: admUpdated.email,
        subject: `Password Recovery`,
        message,
      });
      return res.status(200).json({   
        success: true,
        message: `Email sent to ${admUpdated.email} successfully`,
     });

    } catch (error) {
        admUpdated.resetPasswordCode = "";
        admUpdated.resetPasswordExpire = undefined;
  
        admUpdated = await updateAdmResetCode(req.body.email, admUpdated);
  
        return res.status(500).json({ status: 'Error', message: error });

    }
  };

const resetPassword = async (req, res) => {
    // getting code
    const resetPasswordCode = req.body.resetPasswordCode;
  

    const adm = await getAdmByEmail(req.body.email);
  
    if (!adm) {
      return res.status(400).json({ status: 'Bad request', message: "Email not valid" });
    }

    if (adm.resetPasswordCode!==resetPasswordCode) {
      return res.status(400).json({ status: 'Bad request', message: "Reset Password code is invalid or has been expired" });
  }


    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ status: 'Bad Request', message: "Password does not password" });
    }
    adm.password = req.body.password;
    adm.resetPasswordCode = "";
    adm.resetPasswordExpire = undefined;
  
    const admUpdated = await resetAdmPassword(adm.id, adm);
  
    sendToken(admUpdated,"ADM", 200, res);
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