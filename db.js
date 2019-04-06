const path = require('path');
const mongoose = require('mongoose');

mongoose.connection.on('error', (err) => {
    console.error(err);
    throw err;
});

require('dotenv').config({
    path: path.join(__dirname, 'config', 'db.env')
});

const options = {
    useNewUrlParser: true,
    poolSize: 20,
    family: 4,
    bufferMaxEntries: 0,
    bufferCommands: false
};
// const connectionString = `mongodb://${process.env.HOST}:${process.env.PORT}/calendar`;
const connectionString = `mongodb://${process.env.HOST}/calendar`;

module.exports = {
    connect() {
        // mongoose.set('debug', true);
        return mongoose.connect(connectionString, options);
    }
};
