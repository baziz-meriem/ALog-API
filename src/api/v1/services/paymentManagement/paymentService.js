const prisma = require('../../../../config/dbConfig');
const stripe = require('stripe')('sk_test_51MwCe0AIIjdIkPoTmiwKrNNEG2sREDbvj6InAS9Ti86ddeP2szPz7I40PfLfuQr5MfRwGnLDLTVXWtuZ17tfBrTT00cwTqng3X');

const createPayment = async (req, res) => {
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: req.body.cardNumber,
        exp_month: req.body.expMonth,
        exp_year: req.body.expYear,
        cvc: req.body.cvc,
      },
      billing_details: {
        email: req.body.email,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: req.body.currency,
      payment_method: paymentMethod.id,
      description: req.body.description,
      receipt_email: req.body.email,
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
    return null;
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










module.exports = {
  createPayment,
  cancelPayment,
  confirmPayment 

};
