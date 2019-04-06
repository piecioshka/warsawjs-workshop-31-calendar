const { getRangeDay } = require('../helpers/calendar');

const EventModel = require('../../models/event-model');

async function getEvents(dates) {
    const results = [];

    for (let date of dates) {
        const events = await getEventsByDate(date);
        results.push({ date, events });
    }

    return results;
}

async function getEventsByDate(date) {
    const { start: $gte, end: $lte } = getRangeDay(date);
    const events = await EventModel.find({
        time: { $gte, $lte }
    });

    events.forEach((event) => {
        event.id = event._id;
    });
    return events;
}

async function createEvent(data) {
    const model = await EventModel.create(data);
    return model._id;
}

async function deleteEventById(id) {
    await EventModel.deleteOne({ _id: id });
    return id;
}

async function updateEventById(id, data) {
    await EventModel.updateOne({ _id: id }, data);
    return id;
}

module.exports = {
    getEvents,
    createEvent,
    deleteEventById,
    getEventsByDate,
    updateEventById
};
