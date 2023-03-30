const { sendToken, comparePassword, getResetPasswordCode } = require('../../middlewares/utils');
const { getDecideurByEmail, resetDecideurPassword, updateDecideurResetCode } = require('../../services/auth/decideurService');
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
    const isPasswordMatched = await comparePassword(password,decideur.mot_de_passe)
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
    
      
        // Get ResetPassword code
        const {resetCode , user:decideurUpdated } = getResetPasswordCode(decideur);
      //update the resetPassword code and expirePassword code 
      decideurUpdated = await updateDecideurResetCode(req.body.email, acUpdated);
    
      
      
        const message = `Your password reset code is :- \n\n ${resetCode} \n\nIf you have not requested this email then, please ignore it.`;
      
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
            decideurUpdated.resetPasswordCode = undefined;
            decideurUpdated.resetPasswordExpire = undefined;
      
            decideurUpdated = await updateDecideurResetCode(req.body.email, decideurUpdated);
      
            return res.status(500).json({ status: 'Error', message: error });
    
        }

}

const resetPassword = async (req, res) => {
    // getting reset code
    const resetPasswordCode = req.body.code;
  
      const decideur = await getDecideurByEmail(req.body.email);
  
      if (!decideur) {
          return res.status(400).json({ status: 'Bad request', message: "Email not valid" });
      }
      if (decideur.resetPasswordCode!==resetPasswordCode) {
        return res.status(400).json({ status: 'Bad request', message: "Reset Password code is invalid or has been expired" });
    }
  
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ status: 'Bad Request', message: "Password does not password" });
    }
    decideur.password = req.body.password;
    decideur.resetPasswordCode = undefined;
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