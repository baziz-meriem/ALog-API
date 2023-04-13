const {createPayment} = require('../../services/paymentManagement/paymentService');



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
        });
    
}

module.exports = {
    paymentHandler
}