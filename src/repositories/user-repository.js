'use strict';
require("dotenv").config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.get = async () => {
    const res = await User.find({
        active: true,
    },
    "-password"
    );
    return res;
}

exports.getById = async (id) => {
    return await User.findById(id, "-password");
}

exports.getEmail = async (email) => {
    return await User.findOne({ email });
}

exports.createUser = async (data) => {
    const user = new User(data);
    return await user.save();
}

exports.updateUser = async(id, data) => {
    const { name, email, password } = data;
    return await User.findByIdAndUpdate(id, {
        name,
        email,
        password
    });
}

exports.removeUser = async(id) => {
    return await User.findByIdAndRemove(id);
}