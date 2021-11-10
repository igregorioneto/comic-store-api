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
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async (req, res, next) => {
    try {
        const { name, email, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            res.status(400).send({
                message: 'Senhas inválidas'
            });
        }

        const userExists = await repository.getEmail(email);

        if (userExists) {
            res.status(422).send({
                message: 'Usuário já existe. Por favor, cadastrar com outro e-mail!'
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
            message: 'Usuário cadastrado com sucesso!'
        });
    } catch(error) {
        res.status(500).send({
            message: 'Erro ao cadastrar usuário'
        });
    }
}

exports.put = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await repository.updateUser(id,data);
        res.status(201).send({
            message: 'Usuário atualizado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao atualizar o usuário.'
        });
    }
}

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        await repository.removeUser(id);
        res.status(201).send({
            message: 'Usuário deletado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao deletar o usuário.'
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
                message: 'Usuário ou Senha inválida!'
            });
        }

        const checkedPassword = await bcrypt.compare(password, user.password);
    
        if (!checkedPassword) {
            return res.status(422).send({
                message: 'Senha inválida!'
            });
        }

        const token = await authService.generateToken({ id: user._id });

        console.log(token);

        res.status(200).json({ auth: true , token });

    } catch (error) {
        res.status(500).send({
            message: 'Erro na autenticação do usuário'
        });
    }
}

exports.logout = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        await authService.destroyToken(token);
        res.status(201).send({
            message: 'Usuário deslogado!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha na requisição solicitada'
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
                message: 'Usuário não encontrado'
            });
        }

        const newToken = await authService.generateToken({ id: user._id });

        res.status(201).send({
            auth: true,
            token: newToken
        });

    } catch (error) {
        res.status(500).send({
            message: 'Falha ao atualizar o token'
        })
    }
}