const {validateId, validateInput}= require('./inputValidation')

const validateCommande= ({idBoisson,idDistributeur,idConsommateur,etat}) => {

    const valideIdBoisson = validateId(idBoisson);
    const valideIdDistributeur = validateId(idDistributeur);
    const valideEtat = validateInput(etat);
    const valideIdConsommateur = validateId(idConsommateur);
    if (!valideIdBoisson || !valideIdDistributeur || !valideEtat || !valideIdConsommateur) {
        return null;
    }
    return {idBoisson:valideIdBoisson, idDistributeur:valideIdDistributeur, etat:valideEtat, idConsommateur:valideIdConsommateur};
}
module.exports = validateCommande