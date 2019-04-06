jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;

const express = require('express');
const supertest = require('supertest');
const Ajv = require('ajv');
const bodyParser = require('body-parser');

const ajv = new Ajv({ schemaId: 'auto' });
const router = require('../web/routing/api.router');

const { connect } = require('../db');
const EventModel = require('../models/event-model');

let app = null;

beforeAll(async () => {
    await connect();
});

beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    router(app);
})

it('should response on /api/day', () => {
    return supertest(app)
        .get('/api/day?date=2015-01-01')
        .expect(200)
        .then((res) => {
            expect(res.body.data).not.toBeNull();
        });
});

it('should returns events in concrete day', async () => {
    try {
        const model = new EventModel({
            title: 'test-event-title-3',
            description: 'test-event-description-3',
            time: '2040-05-05T15:00',
            notification: false
        })

        await model.save();

        const res = await supertest(app)
            .get('/api/day?date=2040-05-05')
            .expect(200);

        await model.remove();

        expect(res.body.data.length).toEqual(1);
    } catch (err) {
        console.error(err);
    }
});

it('should response on /api/day with schema valid response', () => {

    const schema = require('../docs/schemas/day.scheme.json');
    const validate = ajv.compile(schema);

    return supertest(app)
        .get('/api/day?date=2015-01-01')
        .expect(200)
        .then((res) => {
            const valid = validate(res.body);
            expect(valid).toBeTruthy();
            expect(validate.errors).toBeNull();
        });
});
