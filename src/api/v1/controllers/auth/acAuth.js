const prisma = require('../../../../config/dbConfig');
const { sendToken, getResetPasswordToken, comparePassword, sendEmail } = require('../../middlewares/utils');
const { getAcByEmail,  updateAcResetToken, getAcByResetToken, resetAcPassword , getAllAcs, createAc } = require('../../services/auth/acService');
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
    sendToken(ac, 201, res);

   // return res.status(200).json({ status: 'success', data: ac });
}



// Forgot Password
const forgotPassword = async (req, res) => {
    // call the validateEmail function
    const valideAc = validateEmail(email)  ;
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

  
    // Get ResetPassword Token
    const {resetToken , user:acUpdated } = getResetPasswordToken(ac);
  //update the resetPassword token and expirePassword token 
    acUpdated = await updateAcResetToken(req.body.email, acUpdated);

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: acUpdated.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
      return res.status(200).json({   
        success: true,
        message: `Email sent to ${acUpdated.email} successfully`,
     });

    } catch (error) {
        acUpdated.resetPasswordToken = undefined;
        acUpdatedc.resetPasswordExpire = undefined;
  
        acUpdated = await updateAcResetToken(req.body.email, acUpdated);
  
        return res.status(500).json({ status: 'Error', message: error });

    }
  };

const resetPassword = async (req, res) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const ac = await getAcByResetToken({resetPasswordToken});
  
    if (!ac) {
        return res.status(400).json({ status: 'Bad request', message: "Reset Password Token is invalid or has been expired" });
    }
  
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ status: 'Bad Request', message: "Password does not password" });
    }
    ac.password = req.body.password;
    ac.resetPasswordToken = undefined;
    ac.resetPasswordExpire = undefined;
  
    const acUpdated = await resetAcPassword(ac.id, ac);
  
    sendToken(acUpdated, 200, res);
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