const prisma = require('../../../../config/dbConfig');
const stripe = require('stripe')('sk_test_51MwCe0AIIjdIkPoTmiwKrNNEG2sREDbvj6InAS9Ti86ddeP2szPz7I40PfLfuQr5MfRwGnLDLTVXWtuZ17tfBrTT00cwTqng3X');

const createPayment = async (req, res) =>{
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
    name: req.body.cardholderName,
    email: req.body.email,
    phone: req.body.phone,
    address: {
      line1: req.body.addressLine1,
      line2: req.body.addressLine2,
      city: req.body.city,
      state: req.body.state,
      postal_code: req.body.postalCode,
      country: req.body.country,
    },
  },
});


const paymentIntent = await stripe.paymentIntents.create({
  amount: req.body.amount,
  currency: req.body.currency,
  payment_method: paymentMethod.id,
  description: req.body.description,
  receipt_email: req.body.email,
  customer: {
    name: req.body.customerName,
    phone: req.body.customerPhone,
    email: req.body.email,
    address: {
      line1: req.body.customerAddressLine1,
      line2: req.body.customerAddressLine2,
      city: req.body.customerCity,
      state: req.body.customerState,
      postal_code: req.body.customerPostalCode,
      country: req.body.customerCountry,
    },
  },
  confirm: true,
});
const clientSecret = paymentIntent.client_secret;
return  clientSecret ;
} catch(error){
 
    console.error(error)
   return  null;
  
}


}


module.exports = {
  createPayment,
};
