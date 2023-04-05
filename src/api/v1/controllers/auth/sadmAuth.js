const { sendToken, comparePassword, sendEmail, getResetPasswordCode } = require('../../middlewares/utils');
const {  resetSadmPassword, getSadmByEmail, updateSadmResetCode } = require('../../services/auth/sadmService');

const {  validateEmail, validatePassword } = require('../../validators/inputValidation');

const login = async (req, res) => {
    // retrieve the sadm from the request
    const { email, password } = req.body;
    // checking if ac has given password and email both
    if (!email || !password) {
        return res.status(400).json({ status: 'Bad Request', message: 'Please Enter Email & Password' });
    }
    // call the validateEmail and validatePassword functions
    const valideSadm = validateEmail(email) && validatePassword(password) ;
    // if there is an error, return a 400 status code
    if (!valideSadm) {
        return res.status(400).json({ status: 'Bad Request', message: "provided sadm is not valid" });
    }
  
    // call the service to get the sadm by email
    const sadm = await getSadmByEmail(email);
    // return the ac
    if (!sadm) {
        return res.status(404).json({ status: 'Not Found', message: 'SADM not found, Invalid Email or Password' });
    }
    //compare between entered password and the one retrieved
    const isPasswordMatched = await comparePassword(password,sadm.mot_de_passe)
    if (!isPasswordMatched) {
        return res.status(401).json({ status: 'Not Found', message: 'SADM not found, Invalid Password' });
    }
    //send auth token
    sendToken(sadm,"SADM", 200, res);

   // return res.status(200).json({ status: 'success', data: ac });
}



// Forgot Password
const forgotPassword = async (req, res) => {
    // call the validateEmail function
    const valideSadm = validateEmail(req.body.email)  ;
    // if there is an error, return a 400 status code
    if (!valideSadm) {
        return res.status(400).json({ status: 'Bad Request', message: "provided ac email is not valid" });
    }
  
    // call the service to get the sadm by email
    let sadm = await getSadmByEmail(req.body.email);
    // return error if the sadm is not found
    if (!sadm) {
        return res.status(404).json({ status: 'Not Found', message: 'AC not found, Invalid Email' });
    }  

  
    // Get ResetPassword code
    let {resetCode , user:sadmUpdated } = getResetPasswordCode(sadm);
  //update the resetPassword code and expirePassword code 
  sadmUpdated = await updateSadmResetCode(req.body.email, sadmUpdated);

  
    const message = `Your password reset code is :- \n\n ${resetCode} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: sadmUpdated.email,
        subject: `Password Recovery`,
        message,
      });
      return res.status(200).json({   
        success: true,
        message: `Email sent to ${sadmUpdated.email} successfully`,
     });

    } catch (error) {
        sadmUpdated.resetPasswordCode = "";
        sadmUpdated.resetPasswordExpire = undefined;
  
        sadmUpdated = await updateSadmResetCode(req.body.email, admUpdated);
  
        return res.status(500).json({ status: 'Error', message: error });

    }
  };

const resetPassword = async (req, res) => {
    // getting reset code
    const resetPasswordCode = req.body.resetPasswordCode;
  
      const sadm = await getSadmByEmail(req.body.email);
  
      if (!sadm) {
          return res.status(400).json({ status: 'Bad request', message: "Email not valid" });
      }
      if (sadm.resetPasswordCode!==resetPasswordCode) {
        return res.status(400).json({ status: 'Bad request', message: "Reset Password code is invalid or has been expired" });
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ status: 'Bad Request', message: "Password does not password" });
    }
    sadm.password = req.body.password;
    sadm.resetPasswordCode = "";
    sadm.resetPasswordExpire = undefined;
  
    const sadmUpdated = await resetSadmPassword(sadm.id, sadm);
  
    sendToken(sadmUpdated,"SADM", 200, res);
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