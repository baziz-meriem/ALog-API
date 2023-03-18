const crypto = require("crypto");
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
const sendToken = (user, statusCode, res) => {
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
    });
  };
//create a token
 const getResetPasswordToken =  (user)=> {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return {resetToken:resetToken , user:user};
  };

  const comparePassword = async function (addedPassword , userPassword) {
    return await bcrypt.compare(addedPassword, userPassword);
  };
  
  
  module.exports = {sendToken , getJWTToken , getResetPasswordToken , sendEmail , comparePassword }