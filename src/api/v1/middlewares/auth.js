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


module.exports = {
    isAuth,
    isAC
}