const configLoader = require('./config');
const databaseLoader = require('./db');
const expressLoader = require('./express');

module.exports = async (app) => {

    // Load configuration
    await configLoader();
    console.log('Loading... config');

    // Connect to database
    await databaseLoader();
    console.log('Loading... database');

    // Define routes
    await expressLoader(app);
    console.log('Loading... express');

};
