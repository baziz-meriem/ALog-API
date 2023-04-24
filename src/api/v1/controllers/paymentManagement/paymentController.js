const { validateId } = require("../../validators/inputValidation");
const { validatePaymentData } = require("../../validators/payementValidation");
const creditCardType = require("credit-card-type");
const { sendBillingEmail } = require("../../middlewares/utils");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const axios = require('axios');
const {
  getAllPayments,
  getOnePayment,
  createDBPayment,
  updatePayment,
  deletePayment,
} = require("../../services/paymentManagement/paymentService");
const {
  updateCommandeEtat,
} = require("../../services/paymentManagement/commandeService");


const paymentHandler = async (req, res) => {
  //get the payment data and validate it
  const data = await validatePaymentData(req.body);

  if (data != "valideData") {
    return res.status(400).json({
      status: "Bad Request",
      message: data,
    });
    
  } else { 
    const data = req.body
    try {
      const paymentMethod = await stripe.paymentMethods.create({
        type: "card", //it supports various cards -> listed in the website with tests card numbers
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

      let amountInClientCurrency = data.amount;

      if (data.currency !== "dzd") {
        const apiKey = process.env.FIXER_API_KEY;
        const from = "DZD";
        const to = data.currency;
        try {
          const response = await axios.get(
            `https://api.apilayer.com/fixer/convert?from=${from}&to=${to}&amount=${data.amount}&apikey=${apiKey}`
          );
          amountInClientCurrency = response.data.result;

        } catch (error) {
          throw new Error("Error getting exchange rate");
        }
      }

      const paymentIntent = await stripe.paymentIntents.create({

        amount: Math.round(amountInClientCurrency), //it expects an integer cause it uses the smallest currency unit example if it's usd or eur we use cents
        currency: data.currency,
        payment_method: paymentMethod.id,
        receipt_email: data.email, //the email where the receipt will be sent
        confirm: false, // set confirm to false to require manual confirmation
        metadata: {
          // to store additionnal data
          boissonLabel: data.boissonLabel,
          cardNumber: data.cardNumber,
          distributeurId: data.distributeurId,
          boissonId: data.boissonId,
          commandeId: data.commandeId,
        },
      });

      const clientSecret = paymentIntent.client_secret;
      const paymentIntentId = paymentIntent.id;

      return res.status(200).json({
        status: "OK",
        message: "payment intent created ",
        data: { paymentIntentId, clientSecret }, //intentId used for canceling a payment clientSecret used for confirming a payment
      });

    } catch (error) {
      
      return res.status(400).json({
        status: "Bad Request",
        message: "payement via Stripe failed",
        error: error.message,
      });
    }
  }
};

const cancelPayementHandler = async (req, res) => {

  const paymentIntentId = req.body.paymentIntentId;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Check if payment has already been captured
    if (paymentIntent.status === "succeeded") {
      // Payment has been captured, call the refunding function
     await refundPaymentHandler(paymentIntent,res)

    } else {
      // Payment has not been captured, cancel the PaymentIntent
      const cancelledPaymentIntent = await stripe.paymentIntents.cancel(
        paymentIntent.id
      );
      return res.status(200).json({
        status: "OK",
        message: "payment canceled successfully",
        data: cancelledPaymentIntent.status,
      });
    }
  } catch (error) {

    return res.status(400).json({
      status: "Bad Request",
      message: "payment cancelation failed",
      error: error.message,
    });
  }
};

const refundPaymentHandler = async (paymentIntent, res) => {

  try {
    // create refund
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntent.id,
      amount: paymentIntent.amount,
    });
    // refund successful
    return res.status(200).json({
      status: "OK",
      message: "payment refunded successfully",
      data: refund.status,
    });
  } catch (error) {
    // handle error
    return res.status(500).json({
      status: "error",
      message: "error while refunding payment",
      error: error.message,
    });
  }
};

const confirmPayementHandler = async (req, res) => {

  const paymentIntentId = req.body.paymentIntentId;

  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

    return res.status(200).json({
      status: "OK",
      message: "payment confirmed successfully",
      data: paymentIntent.status,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad Request",
      message: "payment confirmation failed",
    });
  }
};

/*
commande for testing in stripe cli:

stripe listen --forward-to http://localhost:8080/api/v1/paymentManagement/payment/webhooks
*/

const webhookHandler = async (req, res) => {
  //to generate endpoint secret use stripe cli to be downloaded from stripe doc
  
  try {
  
    //etats commande : en attente (default), annulée , sérvis,échoué, réussi
    //etats payment : annulé , remboursé , réussi , échoué
    
  const endpointSecret = process.env.STRIPE_CLI_ENDPOINT_SECRET; //webhook sign in secret for local testing has relative to the pc
  const sig = req.headers["stripe-signature"]; //a signature generated by Stripe that ensures the request is coming from Stripe
  const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

  const paymentIntent = event.data.object;
  const cardNumber = paymentIntent.metadata.cardNumber;
  const typeCarte = creditCardType(cardNumber)[0].niceType;
  
    switch (event.type) {

      case "payment_intent.created":

        const idCommande = parseInt(paymentIntent.metadata.commandeId);
        const monnaie = paymentIntent.currency;
        const montant = paymentIntent.amount;
       

        try {
          const DBpayment = await createDBPayment({
            montant,
            etat : "en attente",
            typeCarte,
            monnaie,
            idCommande,
          });
    
          if (!DBpayment) {
            return res.status(400).json({
              status: "Bad Request",
              message: "Error while creating a new payment in database",
            });
          }
    
          await stripe.paymentIntents.update(paymentIntent.id, {
            metadata: {
              ...paymentIntent.metadata,
              paymentId: DBpayment.id,
            },
          });
          res.status(200).send("payment inserted in db successfully , and Stripe payment intent updated successfully");
        } catch (error) {
          res.status(400).send("An error occurred processing the newly created payment intent: " + error.message);
        }
        break;
      case "payment_intent.succeeded":
        // Update commande etat to réussi (will be changed in case there is a reclamation)

        const id = parseInt(paymentIntent.metadata.paymentId);
        const commandeId = parseInt(paymentIntent.metadata.commandeId);
        try {
        const updateCommande = await updateCommandeEtat(commandeId,"réussi" );
        if (!updateCommande) {
          return res.status(400).json({
            status: "Bad Request",
            message: "Error while updating commande",
          });
        } else {
        const updateSucceedpayment = await updatePayment(id, "réussi");

        if (!updateSucceedpayment) {
          return res.status(500).json({
            status: "Error",
            message: "Error while updating payment",
          });
        } else {
          
          // Send billing email to the payer
          try {
          
            await sendBillingEmail(
              paymentIntent,
              event.data.object.receipt_email
            );
          
            return res.status(200).json({
              status: "Success",
              message: "Payment succeeded and billing email sent",
            });
          } catch (error) {
          // console.log(error)
            return res.status(500).json({
              status: "Error",
              message: `Email failed to send: ${error.message}`,
            });
          }
        }
      }
      } catch(error){
        res.status(400).send("payment failed to update: " + error.message);
      }
        break;
      case "payment_intent.canceled":
        const IdCommande = parseInt(paymentIntent.metadata.commandeId);
      try {
        //update commande etat to annulée
        const updateCanceledCommande = await updateCommandeEtat(IdCommande,"annulé");

        if (!updateCanceledCommande) {

          return res.status(400).json({
            status: "Bad Request",
            message: "Error while updating commande",
          });
        } else {
          //update payment etat to annulée
          const Paymentid = parseInt(paymentIntent.metadata.paymentId);

          const updateCanceledpayment = await updatePayment(Paymentid, etatAnnulé);

          if (!updateCanceledpayment) {
            return res.status(400).json({
              status: "Bad Request",
              message: "Error while updating canceled payment",
            });
          }
        }
        res.status(200).send("commande and payment state updated in db successfully");

      } catch (error) {
        res.status(400).send("An error occurred while processing cancled payment: " + error.message);
      }
        break;
      case "charge.refunded":

        const Payid = parseInt(paymentIntent.metadata.paymentId);
        const CommandeId = parseInt(paymentIntent.metadata.commandeId);
        //update commande etat to échoué
        try {

        const updateCommandeEchoue = await updateCommandeEtat(CommandeId, "échoué");

        if (!updateCommandeEchoue) {
          return res.status(400).json({
            status: "Bad Request",
            message: "Error while updating commande etat to echoué",
          });
        } else {
          //update payment etat to remboursé
          
          const updateRefundedpayment = await updatePayment(
            Payid,
            "remboursé"
          );

          if (!updateRefundedpayment) {
            return res.status(400).json({
              status: "Bad Request",
              message: "Error while updating payment etat to remboursé",
            });
          }
        }
        res.status(200).send("commande and payment state updated in db successfully");
      } catch (error){
        res.status(400).send("An error occurred while processing refunded payment: " + error.message);
      
      }
          break;
        
      default:
        // Unexpected event type
        res.status(400).send("Unexpected event type: "+error.message)
    }
  } catch (err) {
    //console.error(err);
    res.sendStatus(400);
  }
};

//----------------------------basic CRUD----------------------

const getAllHandler = async (req, res) => {
  const payments = await getAllPayments();
  if (!payments) {
    return res.status(500).json({
      status: "Internal Server Error",
      message: "An error occured while trying to get all payments",
    });
  }
  return res.status(200).json({
    status: "OK",
    message: "All payments retrieved successfully",
    data: payments,
  });
};

const getOneHandler = async (req, res) => {
  // get the id from the request params
  const { id } = req.params;
  // call validateId to validate the id
  const valideId = validateId(id);
  if (!valideId) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Invalid id",
    });
  }
  const payment = await getOnePayment(valideId);
  if (!payment) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Error while getting payment, invalid id",
    });
  }
  return res.status(200).json({
    status: "OK",
    message: "payment retrieved successfully",
    data: payment,
  });
};

const createHandler = async (req, res) => {
  //create a new annonce
  // get the data from the request body
  const { montant, etat, typeCarte, monnaie, idCommande } = req.body;

  const payment = await createDBPayment({
    montant,
    etat,
    typeCarte,
    monnaie,
    idCommande,
  });
  if (!payment) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Error while creating a new payment in database",
    });
  }

  return res.status(201).json({
    status: "success",
    message: "Payment created successfully",
    data: payment,
  });
};

const updateHandler = async (req, res) => {
  // get the id from the request params
  const { id } = req.params;
  const valideId = validateId(id);
  // get the data from the request body
  const { etat } = req.body;
  // call the service to update the payment
  const payment = await updatePayment(valideId, etat);
  if (!payment) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Error while updating payment",
    });
  }
  return res.status(200).json({
    status: "OK",
    message: "payment updated successfully",
    data: payment,
  });
};

const deleteHandler = async (req, res) => {
  // get the id from the request params
  const { id } = req.params;
  // validate the id
  const valideId = validateId(id);
  if (!valideId) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Invalid id",
    });
  }
  // call the service to delete the annonceur
  const payment = await deletePayment(valideId);
  if (!payment) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Error while deleting payment, id is not valid",
    });
  }

  return res.status(200).json({
    status: "OK",
    message: "Payment deleted successfully",
    data: payment,
  });
};

module.exports = {
  paymentHandler,
  cancelPayementHandler,
  refundPaymentHandler,
  confirmPayementHandler,
  webhookHandler,
  getAllHandler,
  getOneHandler,
  createHandler,
  updateHandler,
  deleteHandler,
};
