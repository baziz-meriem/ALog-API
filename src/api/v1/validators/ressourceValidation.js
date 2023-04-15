const { validateId, validateDate, validateInput } = require('./inputValidation')

const validatePanne = ({ id, idDistributeur, idTypeAnomalie, date }) => {
    /**
     * @description validate the panne format , if its valide, return it with the correct format else return null
     */

    // validate the id
    const valideID = validateId(id)
    // validate the distributeur's id
    const valideIdDistributeur = validateId(idDistributeur)
    // validate the typeAnomalie's id
    const valideIdTypeAnomalie = validateId(idTypeAnomalie)
    // validate the date
    const valideDate = validateDate(date)
    if (!valideID || !valideIdDistributeur || !valideIdTypeAnomalie || !valideDate) {
        return null
    }
    return {
        id: valideID,
        idDistributeur: valideIdDistributeur,
        idTypeAnomalie: valideIdTypeAnomalie,
        date: valideDate
    }
}

const validateTypeAnnomalie = ({ type, description }) => {
    /**
     * @description validate the typeAnnomalie format , if its valide, return it with the correct format else return null
     * @param {string} type
     * @param {string} description
     * @returns {object} typeAnnomalie
     */
    // validate the type
    const validateType = validateInput(type)
    // validate the description
    const validateDescription = validateInput(description)
    if (!validateType || !validateDescription) {
        return null
    }
    return {
        type: validateType,
        description: validateDescription
    }

}

module.exports = {
    validatePanne,
    validateTypeAnnomalie
}