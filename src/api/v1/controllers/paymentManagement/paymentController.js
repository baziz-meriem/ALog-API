const {validateId} = require('../../validators/inputValidation');
const { validatePaymentData } = require("../../validators/payementValidation");
const {
  createPayment,cancelPayment,confirmPayment,getAllPayments,getOnePayment,createDBPayment,updatePayment,deletePayment
} = require("../../services/paymentManagement/paymentService");


const paymentHandler = async (req, res) => {
  // get the id of the drink and id of distributeur from the request params

  // validate the ids

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
      message: "payment successful",
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
              message: 'Error while getting payment'
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
          message: 'Error while creating payment in database'
      });
  }
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
  getAllHandler,
  getOneHandler,
  createHandler,
  updateHandler,
  deleteHandler
};
