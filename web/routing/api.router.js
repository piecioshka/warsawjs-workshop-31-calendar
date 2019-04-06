const express = require('express');
const router = express.Router();

const dayjs = require('dayjs');
const calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar)

router.get('/calendar', (req, res) => {
    const response = { data: [] };
    const month = req.query.month;

    if (!month) {
        res.json(response)
        return;
    }

    const date = new Date(month);

    const from = dayjs(dayjs(date).startOf('month').startOf('week').toDate());

    const calendarWidth = 7;
    const calendarHeight = 6;
    const data = Array.from({ length: calendarWidth * calendarHeight })
        .map((_, index) => {
            const day = from.add(index + 1, 'day').toString();
            return {
                date: day,
                events: []
            }
        });

    response.data = data;

    res.json(response);
});

router.get('/day', (req, res) => {
    res.json({ data: [] });
});

router.get('/event', (req, res) => {
    res.json({ data: [] });
});

router.post('/subscriptions', (req, res) => {
    res.json({ id: 'ups-nie-dziala' });
});

module.exports = (app) => {
    app.use('/api', router);
};
