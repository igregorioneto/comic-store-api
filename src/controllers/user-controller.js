'use strict'

const repository = require('../repositories/user-repository');

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
            res.status(400).send('Senhas inválidas');
        }

        await repository.createUser({
            name,
            email,
            password,
        })

        res.status(201).send({
            message: 'Usuário cadastrado com sucesso!'
        });
    } catch(error) {
        res.status(500).send({
            message: 'Erro ao cadastrar usuário'
        })
    }
}