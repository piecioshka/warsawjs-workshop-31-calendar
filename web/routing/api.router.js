const express = require('express');
const router = express.Router();

router.get('/calendar', (req, res) => {
    res.json({ data: [] });
});

router.get('/day', (req, res) => {
    res.json({ data: [] });
});

router.get('/event', (req, res) => {
    res.json({ data: [] });
});

module.exports = (app) => {
    app.use('/api', router);
};
