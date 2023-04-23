const prisma = require('../../../../config/dbConfig');




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
  getAllPayments,
  getOnePayment,
  createDBPayment,
  updatePayment,
  deletePayment

};
