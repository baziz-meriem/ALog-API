const { sendToken, comparePassword, sendEmail, getResetPasswordCode } = require('../../middlewares/utils');
const { getCostumerByEmail, resetCustomerPassword, updateCostumerResetCode, createCustomer } = require('../../services/auth/consommateurService');

const {   validateEmail, validatePassword } = require('../../validators/inputValidation');
const {  validateCostumer } = require('../../validators/profileValidation');

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
    sendToken(customer,"Consommateur", 200, res);

   // return res.status(200).json({ status: 'success', data: ac });
}

const register = async (req, res) => {
      // call the validateCostumer function to validate the input
      const valideCostumer = validateCostumer(req.body);
      // if there is an error, return a 400 status code
      if (!valideCostumer) {
          return res.status(400).json({ status: 'Bad Request', message: "provided costumer is not valid" });
      }
      // call the service to create the costumer
      const newCostumer = await createCustomer(valideCostumer);
      // if there is an error, return a 400 status code
      if (!newCostumer) {
          return res.status(400).json({ status: 'Bad Request', message: "provided costumer is not valid" });
      }
      // return the new costumer with a token
      sendToken(newCostumer,"Consommateur", 201, res);

   //   return res.status(201).json({ status: 'success', data: newCostumer });
}

const forgotPassword = async (req, res) => {
    const {email} = req.body;
      // call the validateEmail function
      const valideCustomer = validateEmail(req.body.email)  ;
      // if there is an error, return a 400 status code
      if (!valideCustomer) {
          return res.status(400).json({ status: 'Bad Request', message: "provided customer email is not valid" });
      }
    
      // call the service to get the customer
      let costumer = await getCostumerByEmail(req.body.email);
      // return the customer
      if (!costumer) {
          return res.status(404).json({ status: 'Not Found', message: 'Costumerrr not found, Invalid Email' });
      }  
  
    
      // Get ResetPassword code
      let {resetCode , user:costumerUpdated } = getResetPasswordCode(costumer);
      // save the reset code of the customer
      costumerUpdated = await updateCostumerResetCode(req.body.email, costumerUpdated);

    
      const message = `Your password reset code is :- \n\n ${resetCode} \n\nIf you have not requested this email then, please ignore it.`;
    
      try {
        await sendEmail({
          email: costumerUpdated.email,
          subject: `Password Recovery`,
          message,
        });
        return res.status(200).json({   
          success: true,
          message: `Email sent to ${costumerUpdated.email} successfully`,
       });
  
      } catch (error) {
        //delete the reset pwd code
          costumerUpdated.resetPasswordCode = "";
         costumerUpdated.resetPasswordExpire = undefined;
    
          costumerUpdated = await updateCostumerResetCode(req.body.email, costumerUpdated);
    
          return res.status(500).json({ status: 'Error', message: error });
  
      } 
}

const resetPassword = async (req, res) => {
    // getting reset code
    const resetPasswordCode = req.body.resetPasswordCode;

    const customer = await getCostumerByEmail(req.body.email);
  
    if (!costumer) {
        return res.status(400).json({ status: 'Bad request', message: "Email not valid" });
    }
    if (costumer.resetPasswordCode!==resetPasswordCode) {
      return res.status(400).json({ status: 'Bad request', message: "Reset Password code is invalid or has been expired" });
  }
  // if the password and confirm password do not match return an error
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ status: 'Bad Request', message: "Password does not match" });
    }
    costumer.password = req.body.password;
    customer.resetPasswordCode = "";
    customer.resetPasswordExpire = undefined;
  
    const customerUpdated = await resetCustomerPassword(customer.id, customer);
    
    sendToken(customerUpdated,"Consommateur", 200, res);
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