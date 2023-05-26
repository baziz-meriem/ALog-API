const prisma = require('../../../../config/dbConfig');




const getAllPayments = async () => {
  try {
      const payments = await prisma.payment.findMany();
      return payments;
  } catch (error) {
      return null;
  }
};

const createDBPayment = async ({ montant, etat, typeCarte, monnaie,paymentIntentId }) => {
  try {
      const payment = await prisma.Payment.create({
          data: {
            montant,
            etat,
            typeCarte,
            monnaie,
            paymentIntentId 
            }
          });
         
      return payment;
  } catch (error) {
 
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


 
module.exports = {
  getAllPayments,
  createDBPayment,
  updatePayment

};
