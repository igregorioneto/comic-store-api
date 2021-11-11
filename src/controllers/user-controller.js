require("dotenv").config();
const repository = require('../repositories/user-repository');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const authService = require('../services/auth-service');

exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await repository.getById(id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            error: 'Failed to process your request'
        });
    }
}

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            error: 'Failed to process your request'
        });
    }
}

exports.post = async (req, res, next) => {
    try {
        const { name, email, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            res.status(400).send({
                error: 'Invalid password'
            });
        }

        const userExists = await repository.getEmail(email);

        if (userExists) {
            res.status(422).send({
                error: 'User already exists. Please register with another email!'
            })
        }

        // create password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        await repository.createUser({
            name,
            email,
            password: passwordHash,
        })

        res.status(201).send({
            message: 'Successfully registered user!'
        });
    } catch(error) {
        res.status(500).send({
            error: 'Error registering user'
        });
    }
}

exports.put = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await repository.updateUser(id,data);
        res.status(201).send({
            message: 'User updated successfully!'
        });
    } catch (error) {
        res.status(500).send({
            error: 'Error updating user.'
        });
    }
}

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        await repository.removeUser(id);
        res.status(201).send({
            message: 'User deleted successfully!'
        });
    } catch (error) {
        res.status(500).send({
            error: 'Error deleting user.'
        });
    }
}

// Authenticate
exports.authenticate = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await repository.getEmail(email);

        if (!user) {
            return res.status(404).send({
                error: 'Invalid Username or Password!'
            });
        }

        const checkedPassword = await bcrypt.compare(password, user.password);
    
        if (!checkedPassword) {
            return res.status(422).send({
                error: 'Invalid password!'
            });
        }

        const token = await authService.generateToken({ id: user._id });

        console.log(token);

        res.status(200).json({ auth: true , token });

    } catch (error) {
        res.status(500).send({
            error: 'User authentication error'
        });
    }
}

exports.logout = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        await authService.destroyToken(token);
        res.status(201).send({
            message: 'logged out user!'
        });
    } catch (error) {
        res.status(500).send({
            error: 'Requested resquest failed'
        })
    }
}


exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const user = await repository.getById(data._id);

        if (!user) {
            res.status(404).send({
                error: 'User not found'
            });
        }

        const newToken = await authService.generateToken({ id: user._id });

        res.status(201).send({
            auth: true,
            token: newToken
        });

    } catch (error) {
        res.status(500).send({
            error: 'Failed to update token'
        })
    }
}