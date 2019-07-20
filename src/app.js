const express = require('express');

(async () => {

    const app = express();

    // Start initializing
    await require('./loaders')(app);

    // Start web server
    app.listen(process.env.PORT, () => {
        console.log(
            `\nServer was started at http://localhost:${process.env.PORT}`
        )
    });

})();
