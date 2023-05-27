const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const bcrypt = require('bcrypt');

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
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
//generating a JSON Web Token 
const getJWTToken = (user, role) => {
  const token = jwt.sign({ id: user.id, role}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token
}

// generating a JSON Web Token , setting it as a cookie in the response
const sendToken = (user,role,statusCode, res) => {
  const token = getJWTToken(user, role);

  const options = {
    expires: new Date(Date.now() + 7200 * 1000), // 7200 seconds in milliseconds
    httpOnly: true,
  };
  
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
    role
  });
};

const comparePassword = async function (addedPassword, userPassword) {
  try {
    return await bcrypt.compare(addedPassword, userPassword);
  } catch (error) {
    console.error(error);
    throw new Error("Error comparing passwords");
  }
};

module.exports = {
  sendToken,
  getJWTToken,
  sendEmail,
  comparePassword
};
