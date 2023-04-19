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
     
    const clientSecret = paymentIntent.client_secret;
    const paymentIntentId = paymentIntent.id;
    return { paymentIntentId, clientSecret }; //intentId used for canceling a payment clientSecret used for confirming a payment

  } catch (error) {
    console.error(error);
    return null;
  }
};


//move this function to the controller
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
//move this function to the controller
// Function to manually confirm a payment
const confirmPayment = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
    return paymentIntent.status;
  } catch (error) { 
    return null;
  }
};

//etats commande : en attente (default), annulée , sérvis,échoué, réussi
//etats payment : annulé , remboursé , réussi , échoué
const paymentWebhook = async (event) => {
  const paymentIntent = event.data.object;
  const cardNumber = paymentIntent.metadata.cardNumber;
  const typeCarte = creditCardType(cardNumber)[0].niceType;
  let etat;

  switch (event.type) {

    case 'payment_intent.created':
      const idCommande =  parseInt(paymentIntent.metadata.commandeId);
      const monnaie = paymentIntent.currency;
      const montant = paymentIntent.amount;
      etat = "en attente";
       
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
      
      //update commande etat = réussi (will be changed in case there is a reclamation)
        
      //update payment etat to réussi
      const id = parseInt(paymentIntent.metadata.paymentId);
       etat = "réussi";
      const updateSucceedpayment = await updatePayment(id, etat);
      if(!updateSucceedpayment){
          console.log('error updating succeeded payment')
       }
       
    else {

      //send facturation email
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
        amount: (paymentIntent.amount / 100).toFixed(2),
        currency: paymentIntent.currency.toUpperCase(),
        date: new Date(paymentIntent.created * 1000).toLocaleString(),
        cardType:CardType,
        cardNumber:cardNumber,
        boissonLabel:paymentIntent.metadata.boissonLabel
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
    }
      break;
    case 'payment_intent.canceled':

      etat = "annulé";
      const IdCommande = parseInt(paymentIntent.metadata.commandeId);

      //update commande etat to annulée
      const updateCanceledCommande = await updateCommandeEtat(IdCommande, etat);
      if(!updateCanceledCommande){
          console.log('error updating canceled commande')
       } else
        {
      //update payment etat to annulée
      const Paymentid = parseInt(paymentIntent.metadata.paymentId);
      

      const updateCanceledpayment = await updatePayment(Paymentid, etat);
      if(!updateCanceledpayment){
          console.log('error updating refunded payment')
       } else
      console.log('Payment intent canceled:', event.data.object.id);
        }
      break;
    case 'charge.refunded':
      const Payid = parseInt(paymentIntent.metadata.paymentId);
      const CommandeId = parseInt(paymentIntent.metadata.commandeId);
      //update commande etat to échoué
      etat = échoué;
      const updateCommandeEchoue = await updateCommandeEtat(CommandeId,etat);
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
