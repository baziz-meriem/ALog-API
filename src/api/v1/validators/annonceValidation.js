const {validateId}= require('./inputValidation')

const validateAnnonce= ({video,periodeAffichage,prixAnnonce, idRegion,idBoisson,idAnnonceur})=>{
    /**
     * @description validate the annonce format , if its valide, return it else return null
     */

    // validate the ids
   const valideIdRegion= validateId(idRegion)
    
    const valideIdBoisson= validateId(idBoisson)

    const valideIdAnnonceur= validateId(idAnnonceur)

     const valideVideo = validateVideo(video)   
     const validePeriodeAffichage = validatePeriodeAffichage(periodeAffichage)
     const validePrixAnnonce = validatePrixAnnonce(prixAnnonce)

    if ( // allowing null values because none is required
       !valideIdRegion || !valideIdBoisson || !valideIdAnnonceur || !valideVideo || !validePrixAnnonce || !validePeriodeAffichage 
      ) { return null }
      else {
        return {
          idRegion: valideIdRegion,
          idBoisson: valideIdBoisson,
          idAnnonceur: valideIdAnnonceur,
          video: valideVideo,
          periodeAffichage: validePeriodeAffichage,
          prixAnnonce: validePrixAnnonce,
        };
}
}
const validateVideo = (video) => {
    if (typeof video !== 'string') {
      return null; // input is not a string, return null
    }
    const trimmedVideo = video.trim(); // remove leading/trailing spaces
    if (trimmedVideo.length === 0) {
      return null; // input string is empty, return null
    }
   
    return trimmedVideo; // input is a non-empty string, return it
  };
  const validatePeriodeAffichage = (periode) => {
    const pattern = /^[0-9]+$/; // pattern for "only numbers"
    if (typeof periode !== 'string' || !pattern.test(periode)) {
      return null; 
    }

    return periode; // input is a valid period, return it
  };
  const validatePrixAnnonce = (prix) => {
    const MIN_PRICE = 500; // minimum valid price
    const MAX_PRICE = 100000; // maximum valid price
    if (typeof prix !== 'number' || isNaN(prix) || prix < MIN_PRICE || prix > MAX_PRICE) {
      return null; // input is not a valid price, return null
    }
    
    return prix; // input is a valid price, return it
  };

module.exports={
    validateAnnonce
}