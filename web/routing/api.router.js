const express = require('express');
const router = express.Router();

const { buildCalendar } = require('../helpers/calendar');
const { createEvent, getEvents, deleteEventById, getEventsByDate, updateEventById } = require('../services/events');

router.get('/calendar', async (req, res) => {
    try {
        const month = req.query.month;
        const response = { data: [] };

        if (!month) {
            console.warn('month is not defined (in query)');
            return void res.json(response);
        }

        const dates = buildCalendar(month);
        const events = await getEvents(dates);

        response.data = events;
        res.json(response);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/day', async (req, res) => {
    try {
        const date = req.query.date;
        const response = { data: [] };

        if (!date) {
            console.warn('date is not defined (in query)');
            return void res.json(response);
        }

        const events = await getEventsByDate(date);
        response.data = events;
        res.json(response);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/event', async (req, res) => {
    try {
        const params = req.body;

        if (!params) {
            throw new Error('body is not defined');
        }

        const id = await createEvent(params);
        res.json({ id });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/event/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            throw new Error('id is not defined');
        }

        const params = req.body;

        if (!params) {
            throw new Error('body is not defined');
        }

        await updateEventById(id, params);
        res.json({ id });
    } catch (err) {
        res.status(err).json(err);
    }
});

router.delete('/event/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new Error('id is not defined');
    }

    await deleteEventById(id);
    res.json({ id });
});

router.post('/subscriptions', (req, res) => {
    res.json({ id: 'fake-id' });
});

module.exports = (app) => {
    app.use('/api', router);
};
