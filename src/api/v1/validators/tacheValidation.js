const { validateId } = require('./inputValidation');

const validateTache = (Tache) => {
    /**
     * @description validate the Tache and return it or null if it is not valid
     * @param {object} agent
     * @returns {object|null}
    */
    const { idDistributeur, idAM, type, Soustype, description, etat, dateAffectation, dateDebutTraitement, dateFinTraitement, chargement } = Tache;
    const Distid = validateId( idDistributeur );
    const AMid = validateId( idAM );
    const typeTache = validatetypeTache( type ); 
    const etatTache = validateEtatTache( etat ); 
    const chargementTache = validateChargTache( chargement ); 

    if (!Distid || !AMid || !typeTache  || !etatTache ) {
        return null;
    }
    return { idDistributeur, idAM, type, Soustype, description, etat, dateAffectation, dateDebutTraitement, dateFinTraitement, chargement};
}

const validatetypeTache = (type) => {
    if (typeof type !== 'string') {
        return null;
    }
    // if (type !== "anomalie" && type !== "panne") {
    //     return null;
    // }
    return type ; 
}

const validateEtatTache = (etat) => {
    if (typeof etat !== 'string') {
        return null;
    }
    // if (etat !== "pas encore" && etat !== "en cours" && etat !== "traite")  {
    //     return null;
    // }
    return etat ; 
}
const validateChargTache = (charge) => {
    // if (typeof charge !== 'float') {
    //     return null;
    // }
    return charge ; 
}

module.exports = {
    validateTache
}