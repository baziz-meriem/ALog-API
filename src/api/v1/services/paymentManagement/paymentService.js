const prisma = require('../../../../config/dbConfig');
const stripe = require('stripe')('sk_test_51MwCe0AIIjdIkPoTmiwKrNNEG2sREDbvj6InAS9Ti86ddeP2szPz7I40PfLfuQr5MfRwGnLDLTVXWtuZ17tfBrTT00cwTqng3X');

const createPayment = async (data) => {
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: data.cardNumber,
        exp_month: data.expMonth,
        exp_year: data.expYear,
        cvc: data.cvc,
      },
      billing_details: {
        email: data.email,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: data.currency,
      payment_method: paymentMethod.id,
      description: data.description,
      receipt_email: data.email, //the email where the receipt will be sent
      confirm: false, // set confirm to false to require manual confirmation
    });

    const clientSecret = paymentIntent.client_secret;
    const paymentIntentId = paymentIntent.id;
    return {paymentIntentId,clientSecret}; //intentId used for canceling a payement clientSecret used for confirming a payement
  
  } catch(error) {
    console.error(error)
    return null;
  }
};


//if the customer clicked on proceed payement but he changed his mind in the middenl of the transaction
const cancelPayment = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Check if payment has already been captured
    if (paymentIntent.status === "succeeded") {
      // Payment has been captured, refund
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntent.id,
        amount: paymentIntent.amount,
      });
      console.log("Refund ID:", refund.id);

    } else {
      // Payment has not been captured, cancel the PaymentIntent
      const cancelledPaymentIntent = await stripe.paymentIntents.cancel(
        paymentIntent.id
      );
      console.log("PaymentIntent ID:", cancelledPaymentIntent.id);
      console.log("PaymentIntent status:", cancelledPaymentIntent.status);
      return cancelledPaymentIntent.status; // should return 'canceled'
    }
  } catch (error) {
    console.error(error);
    return null; //"whsec_769b58bcad36d9892c57272e2ff0f954fcce096f7b77c889ac0dabc38cde4a9d"
  }
};
// Function to manually confirm a payment
const confirmPayment = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
    console.log("PaymentIntent ID:", paymentIntent.id);
    console.log("PaymentIntent status:", paymentIntent.status);
  
    return paymentIntent.status;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const paymentWebhook = async (event) => {
  switch (event.type) {
    case 'payment_intent.succeeded':
      // Handle successful payment intent
      console.log('Payment intent succeeded:', event.data.object.id);
      break;
    case 'payment_intent.created':
      // Handle created payment intent
      console.log('Payment intent created:', event.data.object.id);
      break;
    case 'payment_intent.canceled':
      // Handle canceled payment intent
      console.log('Payment intent canceled:', event.data.object.id);
      break;
    case 'payment_intent.payment_failed':
      // Handle failed payment intent
      console.log('Payment intent failed:', event.data.object.id);
      break;
    case 'charge.refunded':
      // Handle refunded charge
      console.log('Charge refunded:', event.data.object.id);
      break;
    default:
      // Unexpected event type
      console.log('Unexpected event type:', event.type);
  }
};

//-------------------basic CRUD --------------------//

const getAllPayments = async () => {
  try {
      const payments = await prisma.payment.findMany();
      return payments;
  } catch (error) {
      return null;
  }
};

const getOnePayment = async (id) => {
  try {
      const payment = await prisma.payment.findUnique({
          where: {
              id
          }
      });
      return payment;
  } catch (error) {
      return null;
  }
}

const createDBPayment = async ({ montant, etat, typeCarte, monnaie, idCommande }) => {
  try {
      const payment = await prisma.Payment.create({
          data: {
            montant,
            etat,
            typeCarte,
            monnaie,
            commande: {
              connect: {
                id: idCommande
              }
            }
            }
          });
          console.log('payment',payment)
      return payment;
  } catch (error) {
    console.error(error)
      return null;
  }
}


const updatePayment = async (id, etat) => {
  try {
      const updatedPayment = await prisma.payment.update({
        where: { id},
        data: { etat },
      })
      return  updatedPayment
    } catch (error) {
      return null
    }
}

const deletePayment = async (id) => {
  try {
      const payment = await prisma.payment.delete({
          where: {
              id
          }
      });
      return payment;
  } catch (error) { 
      return null;
  }
}

 
module.exports = {
  createPayment,
  cancelPayment,
  confirmPayment,
  paymentWebhook,
  getAllPayments,
  getOnePayment,
  createDBPayment,
  updatePayment,
  deletePayment

};
