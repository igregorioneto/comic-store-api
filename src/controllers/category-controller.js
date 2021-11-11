const repository = require('../repositories/category-repository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha na requisição das categorias'
        });
    }
}

exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        await repository.createCategory({ name });
        res.status(201).send({
            message: 'Categoria cadastrada com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha na criação da categoria'
        })
    }
}