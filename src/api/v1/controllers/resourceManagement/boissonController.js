const { getAll,getAllAvailable, createboisson, getboissonById,deleteboisson , updateboisson} = require('../../services/resourceManagement/boissonService');


const getAllHandler = async (req, res) => { 
    try {
      const { id } =  req.params;
      const boissons = await getAll(id);
      if (boissons.length === 0) {
        return res.status(404).json({ status: 'Not Found', message: 'no drink found' });
      }
      return res.status(200).json({ status: 'success', data: boissons });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'Internal Server Error', message: 'an error occurred' });
    }
  }
//get all available drinks label desc price of a specific dispenser
const getAllAvailableHandler = async (req, res) => { 
    try {
        const { id } =  req.params;
        const boissons = await getAllAvailable(id);
        if (boissons.length === 0) {
          return res.status(404).json({ status: 'Not Found', message: 'no available drink found' });
        }
        return res.status(200).json({ status: 'success', data: boissons });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'Internal Server Error', message: 'an error occurred' });
      }
}
//get label description price and availability of a specific drink in a specific dispenser
const getOneHandler = async (req, res) => { 
    const { distributeurId, boissonId } = req.params;
    const boisson = await getboissonById(distributeurId ,boissonId);
    if (!boisson) {
        return res.status(404).json({ status: 'Not Found', message: 'boisson not found' });
    }
    return res.status(200).json({ status: 'success', data: boisson });
}

// create a new drink for a specific destributor with its label description price availability
const postHandler = async (req, res) => { 
    const {distributeurId} = req.params;
    const {prix ,label,description} = req;
    console.log("---------------------------------------here is the body content --------------------------------");
    console.log(req.body);
    const newboisson = await createboisson(distributeurId,prix,label,description);

    if (!newboisson) {
        return res.status(404).json({ status: 'Not Found', message: 'boisson was not created' });
    } else
    return res.status(201).json({ status: 'success', data: newboisson });
}
//delete a specific drink from a specific distributeur
const deleteHandler = async (req, res) => { 

    const { distributeurId,boissonId } = req.params;
    const deletedboisson = await deleteboisson(distributeurId,boissonId);

    if (!deletedboisson) {
        return res.status(404).json({ status: 'Not Found', message: 'boisson was not deleted from dispenser' ,data: req.params});
    } else
    return res.status(200).json({ status: 'success', data: deletedboisson });
}
 //updates the description and the also the label and the price and availability of a drink
const putHandler = async (req, res) => {
    const { distributeurId,boissonId } = req.params;
   
    const { label,description,prix,disponible } = req.body;
    console.log(req.body)
    
    const updatedboisson = await updateboisson(distributeurId,boissonId,label,description,prix,disponible);
    if (!updatedboisson) {
        return res.status(400).json({ status: 'Bad Request', message: "boisson wasn't updated successfully" });
    }
    return res.status(200).json({ status: 'success', data: updatedboisson });
}



module.exports = {
    getAllHandler,
    getAllAvailableHandler,
    getOneHandler,
    postHandler,
    deleteHandler, 
    putHandler
}
