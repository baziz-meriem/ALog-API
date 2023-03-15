const { getAll, createClient,deleteClient ,updateClient,getClientById} = require('../services/clientService');
const { validateClient } = require('../validators/profileValidation');
const {  validateId } = require('../validators/inputValidation');



const postHandler = async (req, res) => {
  // retrieve the Client from the request
  const { nom,email,numTel} = req.body;
  // call the validateClient function
  const valideClient = validateClient({ nom, email,numTel});
  // if there is an error, return a 400 status code
  if (!valideClient) {
      return res.status(400).json({ status: 'Bad Request', message: "provided client is not valid" });
  }
  // call the service to create the client
  const newClient = await createClient(valideClient);
  // if there is an error, return a 400 status code
  if(!newClient){
      return res.status(400).json({ status: 'Bad Request', message: "provided client is not valid",data:newClient });
  }
  // return the new client
  return res.status(200).json({ status: 'OK', data: newClient });

}
const getOneHandler = async (req, res) => {
  // retrieve the id from the request
  const { id } = req.params;
  // call the validateId function
  const valideId = validateId(id);
  // if there is an error, return a 400 status code
  if (!valideId) {
      return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
  }
  // call the service to get the client
  const client = await getClientById(valideId);
  // return the client
  if (!client) {
      return res.status(404).json({ status: 'Not Found', message: 'Client not found' });
  }
  return res.status(200).json({ status: 'success', data: client });
}
const getAllHandler = async (req, res) => {
    // call the service to get all acs
    const clients = await getAll();
    // if there is an error, return a 500 status code
    if (!clients) {
        return res.status(500).json({ status: 'Internal Server Error', message: 'An error occured while retrieving the Clients' });
    }
    // return the clients
    return res.status(200).json({ status: 'success', data: clients });
}

const putHandler = async (req, res) => {
  // retrieve the id from the request
  const { id } = req.params;
  // call the validateId function
  const valideId = validateId(id);
  // if there is an error, return a 400 status code
  if (!valideId) {
      return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
  }
  // retrieve the client from the request
  const { nom,email,numTel} = req.body;
  // call the validateClient function
  const valideClient = validateClient({ nom,email,numTel});
  if (!valideClient) {
      return res.status(400).json({ status: 'Bad Request', message: "provided client is not valid" });
  }
  // call the service to update the client
  const updatedClient = await updateClient(valideId, valideClient);
  // return the updated ac
  return res.status(200).json({ status: 'success', data: updatedClient });
}

  const deleteHandler = async (req, res) => {
    // retrieve the id from the request
    const { id } = req.params;
    // call the validateId function
    const valideId = validateId(id);
    // if there is an error, return a 400 status code
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    // call the service to delete the Client
    const deletedClient = await deleteClient(valideId);
   
    if(!deletedClient){
      return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
     // return the deleted Client
    return res.status(200).json({ status: 'Client deleted', data: deletedClient });

}


module.exports = {postHandler,getAllHandler,putHandler,deleteHandler,getOneHandler};