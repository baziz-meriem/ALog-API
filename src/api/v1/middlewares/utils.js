const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const bcrypt = require('bcrypt');

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);

};

const getJWTToken =(user)=>{
   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      return token
}

// Create Token and saving in cookie
const sendToken = (user,role, statusCode, res) => {
    const token = getJWTToken(user);
  
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
      role
    });
  };
//create a code
const getResetPasswordCode =   (user)=> {
  const code = Math.floor(Math.random() * 900000) + 100000; // Generates a random number between 100000 and 999999

  // adding resetPasswordCode to userSchema
  user.resetPasswordCode = code.toString();

  user.resetPasswordExpire = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return {resetCode:code , user:user};
};

  const comparePassword = async function (addedPassword , userPassword) {
    try {
      return await bcrypt.compare(addedPassword, userPassword);

    } catch (error) {
      console.error(error);
      throw new Error('Error comparing passwords');
    }

  };
  
  
  module.exports = {sendToken , getJWTToken , getResetPasswordCode , sendEmail , comparePassword }