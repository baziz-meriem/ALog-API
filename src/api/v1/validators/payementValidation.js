const stripe = require('stripe')('sk_test_51MwCe0AIIjdIkPoTmiwKrNNEG2sREDbvj6InAS9Ti86ddeP2szPz7I40PfLfuQr5MfRwGnLDLTVXWtuZ17tfBrTT00cwTqng3X');
const Joi = require('joi');

async function getSupportedCurrencies() {
  try {
    const supportedCurrencies = await stripe.paymentMethods.listPaymentCurrencies();
    console.log('supported currencies', supportedCurrencies.data);
    return supportedCurrencies.data.map((currency) => currency.toUpperCase());
  } catch (error) {
    console.error('Error getting supported currencies:', error);
    return [];
  }
}

const validatePaymentData = async (data) => {
  const supportedCurrencies = await getSupportedCurrencies();

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
    currency: Joi.string().valid(...supportedCurrencies).required() // dynamically validate supported currencies
    .messages({
      'any.only': 'Invalid currency. Please choose a supported currency.',
      'any.required': 'Currency is required.',
    })
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
