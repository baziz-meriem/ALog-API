const { validateInput, validateEmail, validatePassword, validatePhoneNumber, validateId } = require('./inputValidation');

const validateAgent = (agent) => {
    /**
     * @description validate the agent and return it or null if it is not valid
     * @param {object} agent
     * @returns {object|null}
    */
    const { nom, prenom, email, password, numTel, idClient } = agent;
    const valideNom = validateInput(nom);
    const validePrenom = validateInput(prenom);
    const valideEmail = validateEmail(email);
    const validePassword = validatePassword(password);
    const valideNumTel = validatePhoneNumber(numTel);
    const valideIdClient = validateId(idClient);
    if (!valideNom || !validePrenom || !valideEmail || !validePassword || !valideNumTel || !valideIdClient) {
        return null;
    }
    return {
        nom: valideNom,
        prenom: validePrenom,
        email: valideEmail,
        password: validePassword,
        numTel: valideNumTel,
        idClient: valideIdClient
    };
}




const validateSADM = (SADM) => {
    /**
     * @description validate SADM and return it or null if it is not valid
     * @param {object} SADM
     * @returns {object|null}
    */
    const { nom, prenom, email, password, numTel } = SADM;
    const valideNom = validateInput(nom);
    const validePrenom = validateInput(prenom);
    const valideEmail = validateEmail(email);
    const validePassword = validatePassword(password);
    const valideNumTel = validatePhoneNumber(numTel);
    if (!valideNom || !validePrenom || !valideEmail || !validePassword || !valideNumTel ) {
        console.log("y'a err et voila ou: ",valideNom, validePrenom,valideEmail, validePassword,  valideNumTel );
        return null;
    }
    return {
        nom: valideNom,
        prenom: validePrenom,
        email: valideEmail,
        password: validePassword,
        numTel: valideNumTel,
    };
}




module.exports = {
    validateAgent,
    validateSADM
}