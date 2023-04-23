const {validateId} = require('../../validators/inputValidation');
const { validatePaymentData } = require("../../validators/payementValidation");
const {
  createPayment,cancelPayment,confirmPayment,paymentWebhook,getAllPayments,getOnePayment,createDBPayment,updatePayment,deletePayment
} = require("../../services/paymentManagement/paymentService");
const stripe = require('stripe')('sk_test_51MwCe0AIIjdIkPoTmiwKrNNEG2sREDbvj6InAS9Ti86ddeP2szPz7I40PfLfuQr5MfRwGnLDLTVXWtuZ17tfBrTT00cwTqng3X');


const paymentHandler = async (req, res) => {
  //get the payment data and validate it
  const result = await validatePaymentData(req.body);
  if (result != "valideData") {
    return res.status(400).json({
      status: "Bad Request",
      message: result,
    });
  } else {
    // call the payment service
    const payment = await createPayment(req.body);

    if (!payment) {
      return res.status(400).json({
        status: "Bad Request",
        message: "payement failed",
      });
    }
    return res.status(200).json({
      status: "OK",
      message: "payment intent created ",
      data: payment,
    });
  }
};

const cancelPayementHandler = async (req, res) => {

  // Retrieve the PaymentIntent object using the client secret
  const paymentIntentId = req.body.paymentIntentId;
  const payment = await cancelPayment(paymentIntentId);
  if (!payment) {
    return res.status(400).json({
      status: "Bad Request",
      message: "payment cancelation failed",
    });
  }
  return res.status(200).json({
    status: "OK",
    message: "payment canceled successfully",
  });
};


const confirmPayementHandler = async (req, res) => {
  // Retrieve the PaymentIntent object using the client secret
  const paymentIntentId = req.body.paymentIntentId;
  const payment = await confirmPayment(paymentIntentId);
  if (!payment) {
    return res.status(400).json({
      status: "Bad Request",
      message: "payment confirmation failed",
    });
  }
  return res.status(200).json({
    status: "OK",
    message: "payment confirmed successfully",
  });
};

/*
commande for testing in stripe cli:

stripe listen --forward-to http://localhost:8080/api/v1/paymentManagement/payment/webhooks
*/ 

const webhookHandler = async (req, res) => {

  //to generate endpoint secret use stripe cli to be downloaded from stripe doc
  
  const endpointSecret = 'whsec_769b58bcad36d9892c57272e2ff0f954fcce096f7b77c889ac0dabc38cde4a9d';//webhook sign in secret for local testing has relative to the pc
  const sig = req.headers['stripe-signature'];//which is a signature generated by Stripe that ensures the request is coming from Stripe
  
  try {

    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    paymentWebhook(event);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

//----------------------------basic CRUD----------------------

const getAllHandler = async (req,res) => { 
    
  const payments = await getAllPayments();
  if(!payments){
      return res.status(500).json({
          status: 'Internal Server Error',
          message: 'An error occured while trying to get all payments'
      });
  }
  return res.status(200).json({
      status: 'OK',
      message: 'All payments retrieved successfully',
      data: payments
  });
};

const getOneHandler = async (req, res) => { 
      // get the id from the request params
      const { id } = req.params;
      // call validateId to validate the id
      const valideId = validateId(id);
      if(!valideId){
          return res.status(400).json({
              status: 'Bad Request',
              message: 'Invalid id'
          });
      }
      const payment = await getOnePayment(valideId);
      if(!payment){
          return res.status(400).json({
              status: 'Bad Request',
              message: 'Error while getting payment, invalid id'
          });
      }
      return res.status(200).json({
          status: 'OK',
          message: 'payment retrieved successfully',
          data: payment
      });

}

const createHandler = async (req, res) => { //create a new annonce
  // get the data from the request body
  const { montant, etat, typeCarte, monnaie, idCommande } = req.body;

  const payment = await createDBPayment({ montant, etat, typeCarte, monnaie, idCommande });
  if(!payment){
      return res.status(400).json({
          status: 'Bad Request',
          message: 'Error while creating a new payment in database'
      });
  }
  //console.log("payment id",payment.id)
  return res.status(201).json({
      status: 'success',
      message: 'Payment created successfully',
      data: payment
  });
}

const updateHandler = async (req, res) => { 
      // get the id from the request params
      const { id } = req.params;
      const valideId = validateId(id);
      // get the data from the request body
      const { etat } = req.body;
      // call the service to update the payment
      const payment = await updatePayment(valideId, etat);
      if(!payment){
          return res.status(400).json({
              status: 'Bad Request',
              message: 'Error while updating payment'
          });
      }
      return res.status(200).json({
          status: 'OK',
          message: 'payment updated successfully',
          data: payment
      });
  }   

const deleteHandler = async (req, res) => { 
      // get the id from the request params
      const { id } = req.params;
      // validate the id
      const valideId = validateId(id);
      if(!valideId){
          return res.status(400).json({
              status: 'Bad Request',
              message: 'Invalid id'
          });
      }
      // call the service to delete the annonceur
      const payment = await deletePayment(valideId);
      if(!payment){
          return res.status(400).json({
              status: 'Bad Request',
              message: 'Error while deleting payment, id is not valid'
          });
      }

      return res.status(200).json({
          status: 'OK',
          message: 'Payment deleted successfully',
          data: payment
      });
  
}

module.exports = {
  paymentHandler,
  cancelPayementHandler,
  confirmPayementHandler,
  webhookHandler,
  getAllHandler,
  getOneHandler,
  createHandler,
  updateHandler,
  deleteHandler
};
