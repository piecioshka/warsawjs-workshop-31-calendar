const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = (app) => {

    // Middleware Functions
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Routing
    require('../api/routes/base.router')(app);
    require('../api/routes/api.router')(app);

};
