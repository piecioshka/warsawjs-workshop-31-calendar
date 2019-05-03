const path = require('path');
const dotenv = require('dotenv');

module.exports = () => {

    dotenv.config({
        path: path.join(__dirname, '..', 'config', 'app.env')
    });

    dotenv.config({
        path: path.join(__dirname, '..', 'config', 'db.env')
    });

};
