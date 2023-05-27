const prisma = require('../../../../config/dbConfig')


const getAll = async () => {
  try {
    const boissons = await prisma.boissonDistributeur.findMany({
      select: {
        boisson: {
          select: {
            id: true,
            label: true,
            description: true,
          },
        },

      },
    });
    return boissons; // array of boissons
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createboisson = async (label, description) => {
    try {
        const boisson = await prisma.Boisson.create({
            data: {
                label: label,
                description: description
            },
            select: {
                id: true,
                label: true,
                description: true
            }
        });

        return boisson;
    } catch (error) {
        console.log(error);
        return (error);
        
    }
}
module.exports = { getAll, createboisson}