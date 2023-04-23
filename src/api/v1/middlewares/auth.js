const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized",
            data: null
        })
    }
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized",
            data: null
        })
    }
    req.user = decoded;
    /**
     * @todo fix the encoding of the token to be able to get the role and more info from the token(not only the id)
     */
    next();
}
const isADM= (req, res, next) => {
    if (req.user.role !== "ADM") {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized",
            data: null
        })
    }
    next();
}
const isAM= (req, res, next) => {
    if (req.user.role !== "AM") {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized",
            data: null
        })
    }
    next();
}
const isAC= (req, res, next) => {
    if (req.user.role !== "AC") {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized",
            data: null
        })
    }
    next();
}
const isDecideur= (req, res, next) => {
    if (req.user.role !== "Decideur") {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized",
            data: null
        })
    }
    next();
}
const isConsommateur= (req, res, next) => {
    if (req.user.role !== "Consommateur") {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized",
            data: null
        })
    }
    next();
}
const isSADM= (req, res, next) => {
    if (req.user.role !== "SADM") {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized",
            data: null
        })
    }
    next();
}

module.exports = {
    isAuth,
    isADM,
    isAM,
    isAC,
    isDecideur,
    isConsommateur,
    isSADM
}