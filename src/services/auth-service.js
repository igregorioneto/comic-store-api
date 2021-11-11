'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.generateToken = async (data) => {
    return await jwt.sign(data, process.env.SECRET);
}

exports.decodeToken = async (token) => {
    return await jwt.verify(token, process.env.SECRET);
}

exports.destroyToken = async (token) => {
    console.log(token);
    return await jwt.destroy(token, process.env.SECRET);
}

exports.authorize = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).send({
            error: 'Restricted access!'
        });
    } else {
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                res.status(401).send({
                    error: 'Token inválid!'
                })
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}