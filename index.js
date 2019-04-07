const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { connect } = require('./db');

const app = express();

// Load configuration
require('dotenv').config({
    path: path.join(__dirname, 'config', 'app.env')
});

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routing
require('./web/routing/base.router')(app);
require('./web/routing/api.router')(app);

(async () => {

    await connect();

    // Start web server
    app.listen(process.env.PORT, () => {
        console.log(
            `Server was started at http://localhost:${process.env.PORT}`
        )
    });

})();
