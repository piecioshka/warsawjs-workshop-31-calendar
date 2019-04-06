const express = require('express');
const supertest = require('supertest');
const bodyParser = require('body-parser');
const Ajv = require('ajv');

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
});

afterEach(async () => {
    await EventModel.deleteMany({ title: 'test-event-title' });
});

const fake = () => ({
    title: 'test-event-title',
    description: 'test-event-description',
    time: new Date().toISOString(),
    notification: false
});

it('should save event on POST /api/event', async () => {
    const res = await supertest(app)
        .post('/api/event')
        .send(fake())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

    expect(res.body.id).not.toBeNull();
    expect(res.body.id).toEqual(jasmine.any(String));

    const list = await EventModel.find({ title: 'test-event-title' });
    expect(list.length).toEqual(1);
});

it('should remove event on DELETE /api/event', async () => {
    const model = new EventModel(fake());

    await model.save();

    const list = await EventModel.find({ title: 'test-event-title' });
    expect(list.length).toEqual(1);

    const res = await supertest(app)
        .delete('/api/event/' + model._id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

    expect(res.body.id).not.toBeNull();
    expect(res.body.id).toEqual(jasmine.any(String));

    const list2 = await EventModel.find({ title: 'test-event-title' });
    expect(list2.length).toEqual(0);
});

it('should update event on PUT /api/event/:id', async () => {
    const model = new EventModel(fake());
    await model.save();

    const id = model._id;

    const res = await supertest(app)
        .put(`/api/event/${id}`)
        .send(Object.assign(fake(), {
            title: 'ciasteczko'
        }))
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(res.body.id).not.toBeNull();
    expect(res.body.id).toEqual(jasmine.any(String));

    const list = await EventModel.find({ title: 'ciasteczko' });
    expect(list.length).toEqual(1);

    await EventModel.deleteOne({ title: 'ciasteczko' });
});

it('should response on /api/event with schema valid response', () => {
    const schema = require('../docs/schemas/event.scheme.json');
    const validate = ajv.compile(schema);

    return supertest(app)
        .post('/api/event')
        .send(fake())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            const valid = validate(res.body);
            expect(valid).toBeTruthy();
            expect(validate.errors).toBeNull();
        });
});
