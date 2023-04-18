const Joi = require('joi');


const validatePaymentData = async (data) => {

  // Define Joi schema with dynamically validated currency field
  const paymentSchema = Joi.object({
    cardNumber: Joi.string().creditCard().required()
    .messages({
      'string.creditCard': 'Invalid card number. Please enter a valid credit card number.',
      'any.required': 'Card number is required.',
    }),
    expMonth: Joi.number().integer().min(1).max(12).required()
    .messages({
      'number.min': 'Invalid expiration month. Please enter a value between 1 and 12.',
      'number.max': 'Invalid expiration month. Please enter a value between 1 and 12.',
      'any.required': 'Expiration month is required.',
    }),
    expYear: Joi.number().integer().min(new Date().getFullYear()).required()
    .messages({
      'number.min': `Invalid expiration year. Please enter a value greater than or equal to ${new Date().getFullYear()}.`,
      'any.required': 'Expiration year is required.',
    }),
    cvc: Joi.string().length(3).required()
    .messages({
      'string.length': 'Invalid CVC. Please enter a 3-digit code from the back of your card.',
      'any.required': 'CVC is required.',
    }),
    email: Joi.string().email().required()
    .messages({
      'string.email': 'Invalid email address. Please enter a valid email address.',
      'any.required': 'Email is required.',
    }),
    amount: Joi.number().positive().required()
    .messages({
      'number.positive': 'Invalid amount. Please enter a positive value.',
      'any.required': 'Amount is required.',
    }),
    currency: Joi.string().required() 
    .messages({
      'any.required': 'Currency is required.',
    }),
    boissonLabel:Joi.string().required().messages({
      'string.email': 'Invalid boissonLabel. Please enter a string value for boissonLabel.',
      'any.required': 'boissonLabel is required.',
    }),
    distributeurId: Joi.number().integer().required()
    .messages({
      'any.required': 'Distributeur ID is required.',
    }),
  boissonId: Joi.number().integer().required()
    .messages({
      'any.required': 'Boisson ID is required.',
    }),
  commandeId: Joi.number().integer().required()
    .messages({
      'any.required': 'Commande ID is required.',
    }),
});


  const { error } = paymentSchema.validate(data);
  if (error) {
    const message = error.details[0].message;
    console.log(message);
    return message;
  } else {
    return "valideData";
  }
};

module.exports = {
  validatePaymentData,
};
