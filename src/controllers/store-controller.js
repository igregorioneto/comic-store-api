const repository = require('../repositories/store-repository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha na listagem dos Stores'
        })
    }
}

exports.createStore = async (req, res, next) => {
    try {
        const { user, comic } = req.body;
        await repository.createStore({
            user,
            comic
        });
        res.status(201).send({
            message: 'Compra realizada com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao cadastrar compra'
        });
    }
}