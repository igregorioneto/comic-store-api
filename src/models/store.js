const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comic: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comic'
    }]
});

module.exports = mongoose.model('Store', schema);