'use strict'

const repository = require('../repositories/user-repository');
const bcrypt = require('bcrypt');

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