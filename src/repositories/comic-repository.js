'use strict';
const mongoose = require('mongoose');
const Comic = mongoose.model('Comic');

exports.get = async () => {
    return await Comic
        .find()
        .populate('category', '_id, name');
}

exports.createComic = async (data) => {
    const comic = new Comic(data);
    return await comic.save();
}