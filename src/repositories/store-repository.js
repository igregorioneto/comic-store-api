'use strict';
const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.get = async () => {
    return await Store
        .find()
        .populate('user', '_id name email')
        .populate('comic', '_id name price');
}

exports.createStore = async (data) => {
    const store = new Store(data);
    return await store.save();
}