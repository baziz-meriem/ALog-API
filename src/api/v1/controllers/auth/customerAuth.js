const { sendToken, comparePassword, getResetPasswordToken, sendEmail } = require('../../middlewares/utils');
const { createCostumer, getCostumerByEmail, updateCostumerResetToken, getCostumerByResetToken, resetCustomerPassword } = require('../../services/auth/consommateurService');
const {   validateEmail, validatePassword } = require('../../validators/inputValidation');
const {  validateCostumer } = require('../../validators/profileValidation');
const crypto = require("crypto");

const login = async (req, res) => {
    // retrieve the costumer from the request
    const { email, password } = req.body;
    // checking if the customer has given password and email both
    if (!email || !password) {
        return res.status(400).json({ status: 'Bad Request', message: 'Please Enter Email & Password' });
    }
    // call the validateEmail and validatePassword functions
    const valideCustomer = validateEmail(email) && validatePassword(password) ;
    // if there is an error, return a 400 status code
    if (!valideCustomer) {
        return res.status(400).json({ status: 'Bad Request', message: "provided customer is not valid" });
    }
  
    // call the service to get the customer by email
    const customer = await getCostumerByEmail(email);
    // return the customer
    if (!customer) {
        return res.status(404).json({ status: 'Not Found', message: 'Customer not found, Invalid Email or Password' });
    }
    //compare between entered password and the one retrieved
    const isPasswordMatched = await comparePassword(password,customer.mot_de_passe)
    if (!isPasswordMatched) {
        return res.status(401).json({ status: 'Not Found', message: 'Customer not found, Invalid Password' });
    }
    //return customer with a token
    sendToken(customer, 200, res);

   // return res.status(200).json({ status: 'success', data: ac });
}

const register = async (req, res) => {
      // retrieve the costumer from the request
      const { nom, prenom, email, password, numTel } = req.body;
      // call the validateCostumer function to validate the input
      const valideCostumer = validateCostumer({ nom, prenom, email, password, numTel });
      // if there is an error, return a 400 status code
      if (!valideCostumer) {
          return res.status(400).json({ status: 'Bad Request', message: "provided costumer is not valid" });
      }
      // call the service to create the costumer
      const newCostumer = await createCostumer(valideCostumer);
      // if there is an error, return a 400 status code
      if (!newCostumer) {
          return res.status(400).json({ status: 'Bad Request', message: "provided costumerrr is not valid" });
      }
      // return the new costumer with a token
      sendToken(newCostumer, 201, res);

   //   return res.status(201).json({ status: 'success', data: newCostumer });
}

const forgotPassword = async (req, res) => {
    const {email} = req.body;
      // call the validateEmail function
      const valideCustomer = validateEmail(email)  ;
      // if there is an error, return a 400 status code
      if (!valideCustomer) {
          return res.status(400).json({ status: 'Bad Request', message: "provided customer email is not valid" });
      }
    
      // call the service to get the customer
      let costumer = await getCostumerByEmail(req.body.email);
      // return the ac
      if (!costumer) {
          return res.status(404).json({ status: 'Not Found', message: 'Costumer not found, Invalid Email' });
      }  
  
    
      // Get ResetPassword Token
      const {resetToken , user:costumerUpdated } = getResetPasswordToken(costumer);
      // save the reset token of the customer
      costumerUpdated = await updateCostumerResetToken(req.body.email, costumerUpdated);
    
      const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
      )}/password/reset/${resetToken}`;
    
      const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    
      try {
        await sendEmail({
          email: costumerUpdated.email,
          subject: `Ecommerce Password Recovery`,
          message,
        });
        return res.status(200).json({   
          success: true,
          message: `Email sent to ${costumerUpdated.email} successfully`,
       });
  
      } catch (error) {
        //delete the reset pwd token
          costumerUpdated.resetPasswordToken = undefined;
          costumerUpdated.resetPasswordExpire = undefined;
    
          costumerUpdated = await updateCostumerResetToken(req.body.email, costumerUpdated);
    
          return res.status(500).json({ status: 'Error', message: error });
  
      } 
}

const resetPassword = async (req, res) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  // get customer from the reset password token
    const customer = await getCostumerByResetToken({resetPasswordToken});
  
    if (!costumer) {
        return res.status(400).json({ status: 'Bad request', message: "Reset Password Token is invalid or has been expired" });
    }
  // if the password and confirm password do not match return an error
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ status: 'Bad Request', message: "Password does not match" });
    }
    costumer.password = req.body.password;
    customer.resetPasswordToken = undefined;
    customer.resetPasswordExpire = undefined;
  
    const customerUpdated = await resetCustomerPassword(customer.id, customer);
    
    sendToken(customerUpdated, 200, res);
}

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
    register,
    forgotPassword,
    resetPassword,
    logout

}