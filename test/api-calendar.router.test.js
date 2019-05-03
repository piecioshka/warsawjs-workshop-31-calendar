const express = require('express');
const supertest = require('supertest');
const Ajv = require('ajv');
const dayjs = require('dayjs');
const bodyParser = require('body-parser');

const router = require('../src/web/routes/api.router');
const configLoader = require('../src/loaders/config');
const databaseLoader = require('../src/loaders/db');
const EventModel = require('../src/models/event-model');

const ajv = new Ajv({ schemaId: 'auto' });
let app = null;

beforeAll(async () => {
    await configLoader();
    await databaseLoader();
});

beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    router(app);
});

it('should response on /api/calendar', () => {
    return supertest(app)
        .get('/api/calendar?month=???')
        .expect(200)
        .then((res) => {
            expect(res.body).not.toBeNull();
        });
});

it('should response on /api/calendar?month=2019-04 with list in data key', () => {
    return supertest(app)
        .get('/api/calendar?month=2019-04')
        .expect(200)
        .then((res) => {
            expect(res.body.data.length).toEqual(7 * 6);
        });
});

it('should returns two events after add them', async () => {
    const model1 = await new EventModel({
        title: 'test-event-title-1',
        time: '2020-10-10T15:00'
    });
    const model2 = await new EventModel({
        title: 'test-event-title-1',
        time: '2020-10-10T15:00'
    });

    await model1.save();
    await model2.save();

    const res = await supertest(app)
        .get('/api/calendar?month=2020-10')
        .expect(200);

    expect(res.body.data.length).toEqual(7 * 6);
    const item = res.body.data.find(({ date }) => {
        return dayjs(date).isSame('2020-10-10');
    });

    expect(item.events.length).toEqual(2);

    await model1.remove();
    await model2.remove();
})

it('should response on /api/calendar with schema valid response', () => {
    const schema = require('../docs/schemas/calendar.scheme.json');
    const validate = ajv.compile(schema);

    return supertest(app)
        .get('/api/calendar?month=???')
        .expect(200)
        .then((res) => {
            const valid = validate(res.body);
            expect(valid).toBeTruthy();
            expect(validate.errors).toBeNull();
        });
});
