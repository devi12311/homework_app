const jwt = require("jsonwebtoken");
const {auth} = require("../config/config");

verifyToken = (req, res, next) => {
    let header = req.headers["Authorization"];

    if (!header) {
        return res.status(401).send({
            message: "Unauthorized!"
        });
    }
    jwt.verify(header, auth.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};
const authJwt = {
    verifyToken,
};
module.exports = authJwt;
