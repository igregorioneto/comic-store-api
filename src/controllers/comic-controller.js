const repository = require('../repositories/comic-repository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            error: 'Comics listing failed'
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
            message: 'Comic created successfully!'
        });
    } catch (error) {
        res.status(500).send({
            error: 'Comic creation failed'
        });
    }
}