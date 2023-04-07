const prisma = require('../../../../config/dbConfig');

const getClientsByMonth = async (req, res) => {
    try {
      const year = new Date().getFullYear(); //get the stats only for the current year
      const clientsByMonth = await prisma.$queryRaw`
        SELECT to_char("createdAt", 'YYYY-MM') AS month, COUNT(*) AS count
        FROM "Client"
        WHERE EXTRACT(YEAR FROM "createdAt") = ${year}
        GROUP BY month
      `;
  
      // Convert bigInt values to strings
      const clientsByMonthString = clientsByMonth.map(({ month, count }) => ({
        month: month,
        count: count.toString(),
      }));
  
      return res.json({ clientsByMonth: clientsByMonthString });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error in getClientsByMonth' });
    }
  };
  
  
  
  
const  getDistributeursByClient = async (req,res) => { //returns the number of distributeurs of each client
    try {
        const DistributeursByClient = await prisma.distributeur.groupBy({
          by: ['idClient'],
          _count: {
            idClient: true, //to count the number of distributeurs that belongs to a specific client
          },
        });
    
    // Map the result to rename the count field to `distributeurs`
    const result = DistributeursByClient.map((item) => ({
        distributeurs: item._count.idClient,
        idClient: item.idClient,
      }));
      return res.json({ DistributeursByClient: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getClientsByMonth,
    getDistributeursByClient
}