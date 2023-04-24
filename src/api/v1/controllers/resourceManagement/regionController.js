const { createRegion, deleteRegion, getRegionById, getAllRegions, updateRegion  } = require('../../services/resourceManagement/regionService');
const {  validateId } = require('../../validators/inputValidation');

const getAllHandler = async (req, res) => {
    const regions = await getAllRegions();
    return res.status(200).json({ status: 'success', data: regions });
}

const getOneHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);

    const Region = await getRegionById(valideId);
    if (!Region) {
        return res.status(404).json({ status: 'Not Found', message: 'Region not found' });
    }
    return res.status(200).json({ status: 'success', data: Region });
}

const postHandler = async (req, res) => {

    const { nom } = req.body;

    const newRegion = await createRegion( {nom} );
    if( typeof newRegion === "string" )
    {
        return res.status(400).json({ status: 'Bad Request', message: newRegion });
    }

    return res.status(201).json({ status: 'success', data: newRegion });
}

const putHandler = async (req, res) => {

    const { id } = req.params;
    const valideId = validateId(id);

    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }

    const { nom } = req.body;
    const updatedRegion = await updateRegion(valideId, {nom});
    if( typeof updatedRegion === "string" )
    {
        return res.status(400).json({ status: 'Bad Request', message: updatedRegion });
    }
    return res.status(200).json({ status: 'success', data: updatedRegion });
}

const deleteHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);
    
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    const deletedRegion = await deleteRegion(valideId);
    if( typeof deletedRegion === "string" )
    {
        return res.status(400).json({ status: 'Bad Request', message: deletedRegion });
    }
    return res.status(200).json({ status: 'success', data: deletedRegion });
}

module.exports = {
    getAllHandler,
    getOneHandler,
    postHandler,
    putHandler,
    deleteHandler
}