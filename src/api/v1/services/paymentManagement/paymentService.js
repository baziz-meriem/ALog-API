const prisma = require('../../../../config/dbConfig');
const paypal = require('paypal-rest-sdk');


  paypal.configure({
    'mode': 'sandbox', // sandbox or 'live' if using production credentials
    'client_id': 'AUzm0ezJLgmBiXZ3LjvmsYfIYn-OsFXgPsF4eMVW9k-2xuEcvCq1wY-YmhDSx7PvT6t4HPCJaI7rhO9O',
    'client_secret': 'EKSD2wfkBcqD46K4QR7A-wR3s-daue7Y52-orZq6UR0Y7Rm17-no4o4N-3HcDR7zehyNFlGc5N8LiLNj'
  });

const createPayment = async (req, res) => {
  try {
    //get the drink details from the database
    //also extract the current logged in user id 
    //create a new command
   
  // Set up the payment details
  const paymentDetails = {
    intent: 'sale',
    payer: {
      payment_method: 'credit_card',
      funding_instruments: [
        {
          credit_card: {
            number: '4012888888881881', // credit card number (fake number for sandbox testing)
            type: 'visa', // credit card type (Visa, MasterCard, etc.)
            expire_month: '12', // expiration month (2 digits)
            expire_year: '2024', // expiration year (4 digits)
            cvv2: '123', // CVV2 code
            first_name: 'John', // card holder's first name
            last_name: 'Doe' // card holder's last name
          }
        }
      ]
    },
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: '50.00' // total amount of the transaction
        },
        description: 'Payment for boisson', // description of the transaction
        payee: {
          email: 'jm_baziz@esi.dz' // email address of the payee
        }
      }
    ]
  };
  console.log("--------------------- No error till here ---------------------");

  // Create the payment
  paypal.payment.create(paymentDetails, (error, payment) => {
      //update the state of commande
    if(!error) {
      // Save the payment ID to the database using prisma orm


      //update the state of the command
      // Send the payment ID and drink details to the client
      res.json({ message: 'payment successfully created'});
    }
    else {
      console.error(error)
      return null;
    }
  });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error in createPayment' });
  }
  };


module.exports = {
createPayment
}