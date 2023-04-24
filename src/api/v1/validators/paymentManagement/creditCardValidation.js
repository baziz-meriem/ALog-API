const {validateId, validateInput } = require("../inputValidation");

const validateCreditCard= ({number,expMonth,expYear,cvc,idConsommateur,idCreditCardType}) => {
    const valideIdCreditCardType = validateId(idCreditCardType);
    const valideIdConsommateur = validateId(idConsommateur);
    const valideNumber = validateInput(number);
    const valideExpMonth = validateInput(expMonth);
    const valideExpYear = validateInput(expYear);
    const valideCvc = validateInput(cvc);
    if(!valideIdConsommateur || !valideNumber || !valideExpMonth || !valideExpYear || !valideCvc || !valideIdCreditCardType){
        return null;
    }
    return {
        idConsommateur: valideIdConsommateur,
        idCreditCardType: valideIdCreditCardType,
        number: valideNumber,
        expMonth: valideExpMonth,
        expYear: valideExpYear,
        cvc: valideCvc
    }
}
const validateCreditCardType=({name,logo})=>{
    const valideName = validateInput(name);
    const valideLogo = validateInput(logo);
    if(!valideName || !valideLogo){
        return null;
    }
    return {
        name: valideName,
        logo: valideLogo
    }
}

module.exports = { validateCreditCard ,validateCreditCardType};