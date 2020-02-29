const jwt = require('jsonwebtoken');
const config = require('../config/config');


var hasPermission = (role, method, url) => {
    return (config.permissions.roles[role].includes(method) || config.permissions.excluded_urls.includes(url)) ? true : false;
};

module.exports = (req, res, next) => {
    try {
        jwt.verify(req.token, config.auth.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                if(!hasPermission(req.decoded.role, req.method, req.originalUrl))
                    return res.status(401).json({
                        success: false,
                        message: 'User is not authorized'
                    });

                res.locals.username = req.decoded.username;
                next();
            }
        })

    } catch (e) {
        return res.status(401).json('Invalid token');
    }
};