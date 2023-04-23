const { validateId } = require("../../validators/inputValidation");
const validateCommande = require("../../validators/commandeValidation");
const {
  getAllCommandes,
  getOneCommande,
  getCommandeByUser,
  createCommande,
  updateCommande,
  updateCommandeEtat,
  deleteCommande,
} = require("../../services/paymentManagement/commandeService");

const getAllHandler = async (req, res) => {
  const commandes = await getAllCommandes();
  if (!commandes) {
    return res.status(500).json({
      status: "Internal Server Error",
      message: "An error occured while trying to get all commandes",
    });
  }
  return res.status(200).json({
    status: "OK",
    message: "All commandes retrieved successfully",
    data: commandes,
  });
};

const getOneHandler = async (req, res) => {
  // get the id from the request params
  const { id } = req.params;
  // call validateId to validate the id
  const valideId = validateId(id);
  if (!valideId) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Invalid id",
    });
  }
  // call the service to get one annonce
  const commande = await getOneCommande(valideId);
  if (!commande) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Error while getting commande, invalid id",
      data: null,
    });
  }
  return res.status(200).json({
    status: "OK",
    message: "commande retrieved successfully",
    data: commande,
  });
};
const getByUserHandler = async (req, res) => {
  // retrieve id from request user
  const { id } = req.params;
  // call validator
  const valideId = validateId(id);

  if (!valideId)
    return res
      .status(400)
      .json({ status: "Bad request", message: "Invalid id", data: null });
  // call getCommandeByUser from service
  const commandes = await getCommandeByUser(valideId);
  if (!commandes) {
    return res.status(400).json({
      status: "Bad request",
      message:
        "Error while retrieving commandes for this user, provided id is invalid",
      data: null,
    });
  }
  return res
    .status(200)
    .json({
      status: "Success",
      message: "Commandes retrieved successfully",
      data: commandes,
    });
};

const createHandler = async (req, res) => {
  // get the data from the request body
  const { etat, idConsommateur, idDistributeur, idBoisson, idPayment } =
    req.body;

  const commande = await createCommande({
    etat,
    idConsommateur,
    idDistributeur,
    idBoisson,
    idPayment,
  });
  if (!commande) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Error while creating commande",
    });
  }
  return res.status(201).json({
    status: "success",
    message: "Commande created successfully",
    data: commande,
  });
};

const updateEtatHandler = async (req, res) => {
  // get the id from the request params
  const { id } = req.params;
  const valideId = validateId(id);
  // get the data from the request body
  const { etat } = req.body;
  // call the service to update the commande
  const commande = await updateCommandeEtat(valideId, etat);
  if (!commande) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Error while updating commande",
    });
  }
  return res.status(200).json({
    status: "OK",
    message: "commande updated successfully",
    data: commande,
  });
};

const updateHandler = async (req, res) => {
  // retrieve id from request params
  const { id } = req.params;
  // retrieve commande from request body
  const { idConsommateur, etat, idBoisson, idDistributeur } = req.body;
  // call validator
  const valideId = validateId(id);
  const valideCommande = validateCommande({
    idConsommateur,
    etat,
    idBoisson,
    idDistributeur,
  });
  if (!valideId || !valideCommande) {
    return res.status(400).json({
      status: "Bad request",
      message: "Invalid input",
    });
  }
  const commande = await updateCommande(valideId, valideCommande);
  if (!commande) {
    return res.status(400).json({
      status: "Bad request",
      message: "Error while updating commande",
      data: null,
    });
  }
  return res.status(200).json({
    status: "Success",
    message: "Commande updated successfully",
    data: commande,
  });
};

const deleteHandler = async (req, res) => {
  // get the id from the request params
  const { id } = req.params;
  // validate the id
  const valideId = validateId(id);
  if (!valideId) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Invalid id",
    });
  }
  // call the service to delete command
  const commande = await deleteCommande(valideId);

  if (!commande) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Error while deleting commande, invalid id",
      data: commande,
    });
  }

  return res.status(200).json({
    status: "OK",
    message: "Commande deleted successfully",
    data: commande,
  });
};

module.exports = {
  getAllHandler,
  getOneHandler,
  getByUserHandler,
  createHandler,
  updateHandler,
  updateEtatHandler,
  deleteHandler,
};
