const prisma = require('../../../../config/dbConfig');
const {updateCommandeEtat} = require ("../../services/paymentManagement/commandeService")
const stripe = require('stripe')('sk_test_51MwCe0AIIjdIkPoTmiwKrNNEG2sREDbvj6InAS9Ti86ddeP2szPz7I40PfLfuQr5MfRwGnLDLTVXWtuZ17tfBrTT00cwTqng3X');
const nodemailer = require('nodemailer');
const creditCardType = require('credit-card-type');
const fs = require('fs');
const axios = require('axios');

const createPayment = async (data) => {
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card', //it supports various cards -> listed in the website with tests card numbers
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

    if (data.currency !== 'dzd') {
      const apiKey = 'oCeaKd2kMzhQOVR58Ciq2Q5U92Br3g5M';
      const from = 'DZD';
      const to = data.currency;
      try {
        const response = await axios.get(`https://api.apilayer.com/fixer/convert?from=${from}&to=${to}&amount=${data.amount}&apikey=${apiKey}`);
        amountInClientCurrency = response.data.result;
       // console.log("the amountIn client's currency", amountInClientCurrency);
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
      metadata: {// to store additionnal data
        boissonLabel:data.boissonLabel,
        cardNumber:data.cardNumber,
        distributeurId:data.distributeurId,
        boissonId:data.boissonId,
        commandeId: data.commandeId,
      },
    
    });
     
    //console.log("paymentIntent",paymentIntent.metadata)
    const clientSecret = paymentIntent.client_secret;
    const paymentIntentId = paymentIntent.id;
    return { paymentIntentId, clientSecret }; //intentId used for canceling a payment clientSecret used for confirming a payment

  } catch (error) {
    console.error(error);
    return null;
  }
};



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
      return refund.id; 
    } else {
      // Payment has not been captured, cancel the PaymentIntent
      const cancelledPaymentIntent = await stripe.paymentIntents.cancel(
        paymentIntent.id
      );
      console.log("refunded PaymentIntent status:", cancelledPaymentIntent.status);
      return cancelledPaymentIntent.status; 
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

//etats commande : en attente (default), annulée , sérvis,échoué, réussi
//etats payment : annulé , remboursé , réussi , échoué
const paymentWebhook = async (event) => {
  //define global v ar here 


  switch (event.type) {
    case 'payment_intent.created':

      const paymentIntent = event.data.object;
      const cardNumber = paymentIntent.metadata.cardNumber;
      const idCommande =  parseInt(paymentIntent.metadata.commandeId);
      const monnaie = paymentIntent.currency;
      const montant = paymentIntent.amount;
      const typeCarte = creditCardType(cardNumber)[0].niceType;
      const etat = "en attente";
       
      //create payement in database 
       const DBpayment = await createDBPayment({ montant, etat, typeCarte, monnaie, idCommande });
       if(!DBpayment){
           console.log('error creating payment')
          }
          else {

            // Update PaymentIntent metadata add payment id
            const updatedIntent = await stripe.paymentIntents.update(paymentIntent.id, {
              metadata: {
                ...paymentIntent.metadata, // Keep the existing metadata fields
                paymentId: DBpayment.id // Add a new field to the metadata
              }
            });
            console.log("payment inserted successfully",updatedIntent)
            }
      break;

    case 'payment_intent.succeeded':

      const intent = event.data.object;
      const CardNumber = intent.metadata.cardNumber;
      const CardType = creditCardType(CardNumber)[0].niceType;
      
      //update commande etat = réussi (will be changed in case there is a reclamation)
        
      //update payment etat to réussi
      const id = parseInt(intent.metadata.paymentId);
      const SuccededEtat = "réussi";
      const updateSucceedpayment = await updatePayment(id, SuccededEtat);
      if(!updateSucceedpayment){
          console.log('error updating succeeded payment')
       }
       
    else {
       //reuse the existing email sender function
      //send facturation email
      console.log('Payment successful an email will be sent to the payer:', intent.id);
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
      const paymentData = {
        amount: (intent.amount / 100).toFixed(2),
        currency: intent.currency.toUpperCase(),
        date: new Date(intent.created * 1000).toLocaleString(),
        cardType:CardType,
        cardNumber:CardNumber,
        boissonLabel:intent.metadata.boissonLabel
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
    }
      break;
    case 'payment_intent.canceled':
      const Pintent = event.data.object;
      const CanceledEtat = "annulé";
      const IdCommande = parseInt(Payintent.metadata.commandeId);
      //update commande etat to annulée
      const updateCanceledCommande = await updateCommandeEtat(IdCommande, CanceledEtat);
      if(!updateCanceledCommande){
          console.log('error updating canceled commande')
       } else
      console.log('Commande canceled:', event.data.object.id);
      //update payment etat to annulée
      const Paymentid = parseInt(Pintent.metadata.paymentId);
      

      const updateCanceledpayment = await updatePayment(Paymentid, CanceledEtat);
      if(!updateCanceledpayment){
          console.log('error updating refunded payment')
       } else
      console.log('Payment intent canceled:', event.data.object.id);
      break;
    case 'charge.refunded':
      const Payintent = event.data.object;
      const Payid = parseInt(Payintent.metadata.paymentId);
      const CommandeId = parseInt(Payintent.metadata.commandeId);
      //update commande etat to échoué
      const echecEtat = échoué;
      const updateCommandeEchoue = await updateCommandeEtat(CommandeId,echecEtat);
      if(!updateCommandeEchoue){
        console.log('error updating Commande etat to échoué')
  } else
    console.log('Commande state updated to échoué',);
      //update payment etat to remboursé
      const RefundedEtat = "remboursé";
      const updateRefundedpayment = await updatePayment(Payid, RefundedEtat);
      if(!updateRefundedpayment){
          console.log('error updating refunded payment')
    } else
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
