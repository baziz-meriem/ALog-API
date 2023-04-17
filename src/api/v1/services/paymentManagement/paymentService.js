const prisma = require('../../../../config/dbConfig');
const stripe = require('stripe')('sk_test_51MwCe0AIIjdIkPoTmiwKrNNEG2sREDbvj6InAS9Ti86ddeP2szPz7I40PfLfuQr5MfRwGnLDLTVXWtuZ17tfBrTT00cwTqng3X');
const nodemailer = require('nodemailer');
const fs = require('fs');
const axios = require('axios');

const createPayment = async (data) => {
  //add distributeur id and drink id and commande id in the payment intent
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: data.cardNumber,
        exp_month: data.expMonth,
        exp_year: data.expYear,
        cvc: data.cvc
      },
      billing_details: {
        email: data.email,
      }
    });

    let amountInClientCurrency = data.amount;

    if (data.currency !== 'DZD') {
      const apiKey = 'oCeaKd2kMzhQOVR58Ciq2Q5U92Br3g5M';
      const from = 'DZD';
      const to = data.currency;
      try {
        const response = await axios.get(`https://api.apilayer.com/fixer/convert?from=${from}&to=${to}&amount=${data.amount}&apikey=${apiKey}`);
        amountInClientCurrency = response.data.result;
        console.log("the amountIn client's currency", amountInClientCurrency);
      } catch (error) {
        console.log(error);
        throw new Error('Error getting exchange rate');
      }
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amountInClientCurrency), //it expects an integer cause it uses the smallest currency unit example if it's usd or eur we use cents
      currency: data.currency,
      payment_method: paymentMethod.id,
      receipt_email: data.email, //the email where the receipt will be sent
      confirm: false, // set confirm to false to require manual confirmation
    });

    const clientSecret = paymentIntent.client_secret;
    const paymentIntentId = paymentIntent.id;
    return { paymentIntentId, clientSecret }; //intentId used for canceling a payment clientSecret used for confirming a payment

  } catch (error) {
    console.error(error);
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

//etats commande : en attente (default), annulée , sérvis,échoué, réussi
//etats payment : annulé , remboursé , réussi , échoué
const paymentWebhook = async (event) => {

  switch (event.type) {
    case 'payment_intent.succeeded':
      //create payement in database from metadata data and get price from boisson model with etat = 
      //update commande etat = réussi (will be changed in case there is a reclamation)
      //send facturation email
      console.log('Payment successful an email will be sent to the payer:', event.data.object.id);
      // Send billing email to the payer
      const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '162d18213e1f42',
          pass: 'ae01f360743af1',
        },
      });
      // Read the HTML file content
      const invoiceTemplate = fs.readFileSync('./src/api/v1/templates/invoice.html', 'utf-8');
      
          // Format the payment data
      const paymentIntent = event.data.object;
      console.log('--------------------',paymentIntent.payment_method.card)
      const paymentData = {
        amount: (paymentIntent.amount / 100).toFixed(2),
        currency: paymentIntent.currency.toUpperCase(),
        date: new Date(paymentIntent.created * 1000).toLocaleString(),
        paymentMethod: paymentIntent.payment_method_types[0],
        boisson_label :paymentIntent.payment_method.description
      };
          // Replace variables in the template with payment data
    const formattedInvoice = invoiceTemplate.replace(/{(\w+)}/g, (match, key) => {
      return paymentData[key] || match;
    });
    
      const info = await transporter.sendMail({
        from: 'SmartBev@DevLift.dz',
        to: 'jm_baziz@esi.dz',//event.data.object.receipt_email
        subject: 'Votre reçu de paiement',
        html: formattedInvoice,
      });
      console.log('Email sent: ', info.messageId);
      break;
    case 'payment_intent.canceled':
      //update commande etat to annulée
      //update payment etat to annulé
      console.log('Payment intent canceled:', event.data.object.id);
      break;
    case 'payment_intent.payment_failed':
      //update commande etat to annulée
      //update payment etat to échoué
      console.log('Payment intent failed:', event.data.object.id);
      break;
    case 'charge.refunded':
      //update commande etat to échoué
      //update payment etat to remboursé
      console.log('Charge refunded :', event.data.object.id);
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
