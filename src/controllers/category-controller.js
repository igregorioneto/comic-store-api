const repository = require('../repositories/category-repository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            error: 'Category request failed'
        });
    }
}

exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        await repository.createCategory({ name });
        res.status(201).send({
            message: 'Category successfully registered!'
        });
    } catch (error) {
        res.status(500).send({
            error: 'Category creation failed'
        })
    }
}