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

    // Convert bigInt values to number
    const clientsByMonthString = clientsByMonth.map(({ month, count }) => ({
      month: month,
      count: Number(count),
    }));

    const seenObjects = new Set();
    // Convert the result to a string using a replacer function that removes circular references
    const jsonString = JSON.stringify(clientsByMonthString, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seenObjects.has(value)) {
          return;
        }
        seenObjects.add(value);
      }
      return value;
    });

    return JSON.parse(jsonString); //to convert json string to an object
   // return res.json({ clientsByMonth: clientsByMonthString });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error in getClientsByMonth' });
  }
};


  
  
  
const getDistributeursByClient = async (req, res) => {
  try {
    const distributeursByClient = await prisma.distributeur.groupBy({
      by: ['idClient'],
      _count: {
        idClient: true ,
      }
    });

    // Extract idClient and distributeurs properties from each object
    const result = distributeursByClient.map(({ idClient, _count: { idClient: count } }) => ({
      idClient,
      distributeurs: parseInt(count),
    }));

    const seenObjects = new Set();
    // Convert the result to a string using a replacer function that removes circular references
    const jsonString = JSON.stringify(result, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seenObjects.has(value)) {
          return;
        }
        seenObjects.add(value);
      }
      return value;
    });

    return JSON.parse(jsonString); //to convert json string to an object
    
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


  

module.exports = {
    getClientsByMonth,
    getDistributeursByClient
}