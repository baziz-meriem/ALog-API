const {createPayment,cancelPayment,confirmPayment} = require('../../services/paymentManagement/paymentService');



const paymentHandler = async (req, res) => { 
        // get the id of the drink and id of distributeur from the request params
       
        // validate the ids

        //get the payment data and validate it 

        // call the payment service 

       const payment = await createPayment(req,res);

        if(!payment){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'payement failed'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'payment successful',
            data:payment
        });
    
}
const cancelPayementHandler = async (req,res ) => {
          // Retrieve the PaymentIntent object using the client secret
  const paymentIntentId = req.body.paymentIntentId;
    const payment = await cancelPayment(paymentIntentId);
    if(!payment){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'payment cancelation failed'
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'payment canceled successfully',
    });

}
const confirmPayementHandler = async (req,res ) => {
    // Retrieve the PaymentIntent object using the client secret
const paymentIntentId = req.body.paymentIntentId;
const payment = await confirmPayment(paymentIntentId);
if(!payment){
  return res.status(400).json({
      status: 'Bad Request',
      message: 'payment confirmation failed'
  });
}
return res.status(200).json({
  status: 'OK',
  message: 'payment confirmed successfully',
});

}
module.exports = {
    paymentHandler,
    cancelPayementHandler,
    confirmPayementHandler
}