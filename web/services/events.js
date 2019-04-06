const { getRangeDay } = require('../helpers/calendar');

const EventModel = require('../../models/event-model');

async function getEvents(dates) {
    try {
        const results = [];

        for (let date of dates) {
            const events = await getEventsByDate(date);
            results.push({ date, events });
        }

        return results;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function getEventsByDate(date) {
    try {
        const { start: $gte, end: $lte } = getRangeDay(date);
        const events = await EventModel.find({
            time: { $gte, $lte }
        });

        events.forEach((event) => {
            event.id = event._id;
        });
        return events;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function createEvent(data) {
    try {
        const model = await EventModel.create(data);
        return model._id;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function deleteEventById(id) {
    try {
        await EventModel.deleteOne({ _id: id });
        return id;
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = {
    getEvents,
    createEvent,
    deleteEventById,
    getEventsByDate
};
