const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const creditCardType = require("credit-card-type");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const fs = require("fs");

async function sendBillingEmail(paymentIntent, reciept_email) {

  // Create the transporter object to send emails
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  // Read the HTML file content
  const invoiceTemplate = fs.readFileSync("./src/api/v1/templates/invoice.html","utf-8");
  const cardNumber = paymentIntent.metadata.cardNumber;
  const CardType = creditCardType(cardNumber)[0].niceType;
  // Format the payment data
  const paymentData = {
    amount: (paymentIntent.amount / 100).toFixed(2),
    currency: paymentIntent.currency.toUpperCase(),
    date: new Date(paymentIntent.created * 1000).toLocaleString(),
    cardType: CardType,
    cardNumber:cardNumber,
    boissonLabel: paymentIntent.metadata.boissonLabel,
  };

  // Replace variables in the template with payment data
  const formattedInvoice = invoiceTemplate.replace(/{(\w+)}/g, (match, key) => {
    return paymentData[key] || match;
  });

  // Send the email
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: reciept_email,
    subject: "Votre reçu de paiement",
    html: formattedInvoice,
  };
  await transporter.sendMail(mailOptions);
}

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

const getJWTToken = (user, role) => {
  const token = jwt.sign({ id: user.id, role, idClient: user.idClient }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token
}

// Create Token and saving in cookie
const sendToken = (user, role, statusCode, res) => {
  const token = getJWTToken(user, role);

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
const getResetPasswordCode = (user) => {
  const code = Math.floor(Math.random() * 900000) + 100000; // Generates a random number between 100000 and 999999

  // adding resetPasswordCode to userSchema
  user.resetPasswordCode = code.toString();

  user.resetPasswordExpire = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return { resetCode: code, user: user };
};
//reset password token
const getResetPasswordToken = (user) => {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  user.resetPasswordCode = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return { resetCode: resetToken, user: user };
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
  sendBillingEmail,
  sendToken,
  getJWTToken,
  getResetPasswordCode,
  sendEmail,
  comparePassword,
  getResetPasswordToken,
};
