'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.get = async () => {
    const res = await User.find({
        active: true,
    });
    return res;
}

exports.createUser = async (data) => {
    const user = new User(data);
    await user.save();
}