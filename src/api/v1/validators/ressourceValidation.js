const {validateId,validateDate}= require('./inputValidation')

const validatePanne= ({id,idDistributeur,idTypeAnomalie,date})=>{
    /**
     * @description validate the panne format , if its valide, return it with the correct format else return null
     */

    // validate the id
    const valideID= validateId(id)
    // validate the distributeur's id
    const valideIdDistributeur= validateId(idDistributeur)
    // validate the typeAnomalie's id
    const valideIdTypeAnomalie= validateId(idTypeAnomalie)
    // validate the date
    const valideDate= validateDate(date)
    if(!valideID || !valideIdDistributeur || !valideIdTypeAnomalie || !valideDate){
        return null
    }
    return {
        id:valideID,
        idDistributeur:valideIdDistributeur,
        idTypeAnomalie:valideIdTypeAnomalie,
        date:valideDate
    }
}

module.exports={
    validatePanne
}