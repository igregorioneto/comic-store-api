const repository = require('../repositories/comic-repository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha na listagem dos Comics'
        })
    }
}

exports.createComic = async (req, res, next) => {
    try {
        const { name, price, category } = req.body;
        await repository.createComic({
            name,
            price,
            category
        });
        res.status(201).send({
            message: 'Comic criado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha na criação do Comic'
        });
    }
}