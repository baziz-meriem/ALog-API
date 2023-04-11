const prisma = require('../../../../config/dbConfig');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AT3ivkJG0_rZNyA91rAEMw_BSZ68qgrwmaiGcRr8INSvB7I-BbutHE0_BC4bbaFB6VDVxF17f9UP0pV3',
  'client_secret': 'EKScXflh5PfCtaVlrenbkMtTGGUWcooZbrmxE6McDfWF6UVgjjwTSTC8msCTGBDvou_ur9DOz50AI-a7'
});

const createPayment = async (req, res) => {
  try {
    // Get the drink details from the database
    const payment = {
      intent: 'sale',
      payer: {
        payment_method: 'credit_card',
        funding_instruments: [
          {
            credit_card: {
              number: '4012888888881881',
              type: 'visa',
              expire_month: '12',
              expire_year: '2024',
              cvv2: '123',
              first_name: 'John',
              last_name: 'Doe'
            }
          }
        ]
      },
      transactions: [
        {
          amount: {
            currency: 'DA',//currency matches the currency of payee
            total: '10.00'
          },
          description: 'Payment for boisson'
        }
      ]
    };    
    

    // Create the payment
    paypal.payment.create(payment, (error, payment) => {
      if (error) {
        console.log(error);
        //return res.status(500).json({ message: 'Error in PayPal payment' });
      }

      // Save the payment ID to the database using Prisma ORM

      // Send the payment ID and drink details to the client
      return payment
    });
  } catch (error) {
    console.error(error);
    return null;
    //return res.status(500).json({ message: 'Internal server error in createPayment' });
  }
};

module.exports = {
  createPayment,
};
