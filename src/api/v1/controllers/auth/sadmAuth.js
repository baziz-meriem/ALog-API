const prisma = require('../../../../config/dbConfig');
const { sendToken, getResetPasswordToken, comparePassword, sendEmail } = require('../../middlewares/utils');
const { getSadmByResetToken, resetSadmPassword, updateSadmResetToken, getSadmByEmail, getAllSadms } = require('../../services/auth/sadmService');
const { createSADM } = require('../../services/profileManagement/sadmService');
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
    // return the sadm
    if (!sadm) {
        return res.status(404).json({ status: 'Not Found', message: 'SADM not found, Invalid Email or Password' });
    }
    //compare between entered password and the one retrieved
    const isPasswordMatched = await comparePassword(password,sadm.mot_de_passe)
    if (!isPasswordMatched) {
        return res.status(401).json({ status: 'Not Found', message: 'SADM not found, Invalid Password' });
    }
    //send auth token
    sendToken(sadm, 200, res);

   // return res.status(200).json({ status: 'success', data: ac });
}



// Forgot Password
const forgotPassword = async (req, res) => {
    // call the validateEmail function
    const valideSadm = validateEmail(email)  ;
    // if there is an error, return a 400 status code
    if (!valideSadm) {
        return res.status(400).json({ status: 'Bad Request', message: "provided ac email is not valid" });
    }
  
    // call the service to get the ac by email
    let sadm = await getSadmByEmail(req.body.email);
    // return error if the ac is not found
    if (!sadm) {
        return res.status(404).json({ status: 'Not Found', message: 'AC not found, Invalid Email' });
    }  

  
    // Get ResetPassword Token
    const {resetToken , user:sadmUpdated } = getResetPasswordToken(sadm);
  //update the resetPassword token and expirePassword token 
  sadmUpdated = await updateSadmResetToken(req.body.email, sadmUpdated);

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
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
        sadmUpdated.resetPasswordToken = undefined;
        sadmUpdated.resetPasswordExpire = undefined;
  
        sadmUpdated = await updateSadmResetToken(req.body.email, admUpdated);
  
        return res.status(500).json({ status: 'Error', message: error });

    }
  };

const resetPassword = async (req, res) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const sadm = await getSadmByResetToken({resetPasswordToken});
  
    if (!sadm) {
        return res.status(400).json({ status: 'Bad request', message: "Reset Password Token is invalid or has been expired" });
    }
  
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ status: 'Bad Request', message: "Password does not password" });
    }
    sadm.password = req.body.password;
    sadm.resetPasswordToken = undefined;
    sadm.resetPasswordExpire = undefined;
  
    const sadmUpdated = await resetSadmPassword(sadm.id, sadm);
  
    sendToken(sadmUpdated, 200, res);
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