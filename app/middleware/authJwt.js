const jwt = require("jsonwebtoken");
const {auth} = require("../config/config");

module.exports = {
    verifyToken: (req, res, next) => {
        let header = req.headers["authorization"];

        if (!header) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }

        const [bearer,token] = header.split(' ');

        if (!bearer) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }

        jwt.verify(token, auth.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
            req.userId = decoded.id;
            next();
        });
    }
}



