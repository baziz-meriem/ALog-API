const { getAll,createboisson} = require('../../services/resourceManagement/boissonService');


const getAllHandler = async (req, res) => { 
    try {
      
      const boissons = await getAll();
      
      return res.status(200).json({ status: 'success', data: boissons });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'Internal Server Error', message: 'an error occurred' });
    }
  }

// create a new drink 
const postHandler = async (req, res) => { 
  const {label,description} = req.body;

  const newboisson = await createboisson(label,description);
  
  return res.status(201).json({ status: 'success', data: newboisson });
}


module.exports = {
    getAllHandler,
    postHandler 
}
