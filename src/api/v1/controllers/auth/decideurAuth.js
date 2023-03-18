const { sendToken, comparePassword, getResetPasswordToken } = require('../../middlewares/utils');
const { getDecideurByEmail, updateDecideurResetToken, getDecideurByResetToken, resetDecideurPassword } = require('../../services/auth/decideurService');
const {  validateEmail, validatePassword } = require('../../validators/inputValidation');

const login = async (req, res) => {
    // retrieve the "decideur" from the request
    const { email, password } = req.body;
    // checking if user has given password and email both
    if (!email || !password) {
        return res.status(400).json({ status: 'Bad Request', message: 'Please Enter Email & Password' });
    }
    // call the validateEmail and validatePassword functions
    const valideDecideur = validateEmail(email) && validatePassword(password) ;
    // if there is an error, return a 400 status code
    if (!valideDecideur) {
        return res.status(400).json({ status: 'Bad Request', message: "provided Decideur credentials are not valid" });
    }
  
    // call the service to get the "decideur"
    const decideur = await getDecideurByEmail(email);
    // return decideur
    if (!decideur) {
        return res.status(404).json({ status: 'Not Found', message: 'Decideur not found, Invalid Email or Password' });
    }
    //compare between entered password and the one retrieved
    const isPasswordMatched = await comparePassword(password,decideur.password)
    if (!isPasswordMatched) {
        return res.status(401).json({ status: 'Not Found', message: 'Decideur not found, Invalid Password' });
    }
    sendToken(ac, 200, res);

   // return res.status(200).json({ status: 'success', data: ac });
}



const forgotPassword = async (req, res) => {
   
        // call the validateEmail function
        const valideDecideur = validateEmail(email)  ;
        // if there is an error, return a 400 status code
        if (!valideDecideur) {
            return res.status(400).json({ status: 'Bad Request', message: "provided decideur email is not valid" });
        }
      
        // call the service to get the decideur by email
        let decideur = await getDecideurByEmail(req.body.email);
        // return error if the decideur is not found
        if (!decideur) {
            return res.status(404).json({ status: 'Not Found', message: 'decideur not found, Invalid Email' });
        }  
    
      
        // Get ResetPassword Token
        const {resetToken , user:decideurUpdated } = getResetPasswordToken(ac);
      //update the resetPassword token and expirePassword token 
      decideurUpdated = await updateDecideurResetToken(req.body.email, acUpdated);
    
        const resetPasswordUrl = `${req.protocol}://${req.get(
          "host"
        )}/password/reset/${resetToken}`;
      
        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
      
        try {
          await sendEmail({
            email: decideurUpdated.email,
            subject: `Password Recovery`,
            message,
          });
          return res.status(200).json({   
            success: true,
            message: `Email sent to ${decideurUpdated.email} successfully`,
         });
    
        } catch (error) {
            decideurUpdated.resetPasswordToken = undefined;
            decideurUpdated.resetPasswordExpire = undefined;
      
            decideurUpdated = await updateDecideurResetToken(req.body.email, decideurUpdated);
      
            return res.status(500).json({ status: 'Error', message: error });
    
        }

}

const resetPassword = async (req, res) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const decideur = await getDecideurByResetToken({resetPasswordToken});
  
    if (!decideur) {
        return res.status(400).json({ status: 'Bad request', message: "Reset Password Token is invalid or has been expired" });
    }
  
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ status: 'Bad Request', message: "Password does not password" });
    }
    decideur.password = req.body.password;
    decideur.resetPasswordToken = undefined;
    decideur.resetPasswordExpire = undefined;
  
    const decideurUpdated = await resetDecideurPassword(decideur.id, decideur);
  
    sendToken(decideurUpdated, 200, res);
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