const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();

// Load configuration
require('dotenv').config({
    path: path.join(__dirname, 'config', 'app.env')
})

// Middlewares
app.use(morgan('dev'));

// Routing
require('./web/routing/base.router')(app);

// Start web server
app.listen(process.env.PORT, () => {
    console.log(
        `Server was started at http://localhost:${process.env.PORT}`
    )
});
