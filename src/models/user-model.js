const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
    userId: {
        type: String,
        index: { unique: true, dropDups: true },
        required: true,
    }
});

module.exports = mongoose.model('User', scheme);
