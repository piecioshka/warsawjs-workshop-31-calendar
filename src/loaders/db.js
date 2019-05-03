const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    poolSize: 20,
    family: 4,
    bufferMaxEntries: 0,
    bufferCommands: false
};

module.exports = () => {
    const connectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/calendar`;

    mongoose.connection.on('error', (err) => {
        console.error(err);
        throw err;
    });

    // mongoose.set('debug', true);
    mongoose.connect(connectionString, options);
};
