const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = (app) => {

    // Middlewares
    app.use(morgan('dev'));
    app.use(bodyParser.json());

    // Routing
    require('../web/routes/base.router')(app);
    require('../web/routes/api.router')(app);

};
