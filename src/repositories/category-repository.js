'use strict';
const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.get = async () => {
    return await Category.find();
}

exports.createCategory = async (data) => {
    const category = new Category(data);
    return await category.save();
}