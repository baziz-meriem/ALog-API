
const validateId = (id) => {

    const idNumber = Number(id);
    if (Number.isNaN(idNumber)) {
        return null;
    }
    return idNumber;
}

const validateEmail = (email) => {

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

    if (typeof password !== 'string') {
        return null;
    }
    if (password.length < 6) {
        return null;
    }
    return password;
}

const validatePhoneNumber = (num) => {
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


module.exports = {
    validateId,
    validateEmail,
    validatePassword,
    validatePhoneNumber
}