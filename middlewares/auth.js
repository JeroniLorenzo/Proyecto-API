const jsonwebtoken = require('jsonwebtoken');

const { SECRET } = require('../config/auth')

module.exports = (req, res, next) => {

    if(!req.headers.authorization) {

        res.status(401).json({ msg: "Denied Acces" });
    } else {

        let token = req.headers.authorization.split(" ")[1];

        jsonwebtoken.verify(token, SECRET, (err, decoded) => {

            if(err) {

                res.status(500).json({ msg: "Ha ocurrido un problema al decodificar el token", err });

            } else {

                req.user = decoded;
               
                next();
            }
        })
    }
};