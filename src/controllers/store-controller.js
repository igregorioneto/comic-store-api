const repository = require('../repositories/store-repository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({
            error: 'Stores listing failed'
        })
    }
}

exports.createStore = async (req, res, next) => {
    try {
        const { comic } = req.body;
        console.log(comic);
        if (comic.length === 0) {
            return res.status(404).send({
                error: 'Please enter at least one product!'
            });
        }

        await repository.createStore({
            user: req.userId,
            comic
        });
        return res.status(201).send({
            message: 'Purchase made successfully!'
        });
    } catch (error) {
        return res.status(500).send({
            error: 'Failed to register purchase'
        });
    }
}