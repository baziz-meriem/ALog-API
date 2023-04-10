
const validateId = (id) => {
    /**
     * @description validate the id and return it or null if it is not valid
     * @param {number} id
     * @returns {number|null}
     */
    const idNumber = Number(id);
    if (Number.isNaN(idNumber)) {
        return null;
    }
    return idNumber;
}

const validateEmail = (email) => {
    /**
     * @description validate the email and return it or null if it is not valid
     * @param {string} email
     * @returns {string|null}
     */
    if (typeof email !== 'string') {
        return null;
    }
    if (email.length > 255) {
        return null;
    }
    // check if the email is valid using regex
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        return null;
    }
    return email;
}

const validatePassword = (password) => {
    /**
     * @description validate the password and return it or null if it is not valid
     * @param {string} password
     * @returns {string|null}
     */
    if (typeof password !== 'string') {
        return null;
    }
    if (password.length < 6) {
        return null;
    }
    return password;
}

const validateInput = (input) => {
    /**
     * @description validate the input and return it or null if it is not valid
     * @param {any} input
     * @returns {any|null}
     */
    return input;
}

const validatePhoneNumber = (num) => {
    /**
     * @description validate the phone number and return it or null if it is not valid
     * @param {string} num
     * @returns {string|null}
     */
    if (typeof num !== 'string') {
        return null;
    }

    if (num.length !== 10) {

        return null;
    }
    const numRegex = /^[0-9]+$/;
    if (!numRegex.test(num)) {
        return null;
    }
    return num;
}

const validateDate = (date) => {
    /**
     * @description validate the date and return it or null if it is not valid
     * @param {string} date
     * @returns {String|null}
    */
    const valideDate = new Date(date)
    if (isNaN(valideDate)) {
        return null
    }
    return valideDate.toISOString()
}

module.exports = {
    validateId,
    validateEmail,
    validatePassword,
    validateDate,
    validateInput,
    validatePhoneNumber
}