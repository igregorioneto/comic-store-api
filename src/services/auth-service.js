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
    return await jwt.destroy(token, process.env.SECRET);
}

exports.authorize = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).send({
            message: 'Acesso restrito!'
        });
    } else {
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                res.status(401).send({
                    message: 'Token inválido!'
                })
            } else {
                next();
            }
        });
    }
}