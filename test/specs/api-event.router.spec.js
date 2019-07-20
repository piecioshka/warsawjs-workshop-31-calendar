const express = require('express');
const supertest = require('supertest');
const bodyParser = require('body-parser');
const Ajv = require('ajv');

const router = require('../../src/api/routes/api.router');
const configLoader = require('../../src/loaders/config');
const databaseLoader = require('../../src/loaders/db');
const EventModel = require('../../src/models/event-model');

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

afterEach(async () => {
    await EventModel.deleteMany({ title: 'test-event-title' });
});

const fakeEvent = () => ({
    title: 'test-event-title',
    description: 'test-event-description',
    time: new Date().toISOString(),
    notification: false
});

it('should save event on POST /api/event', async () => {
    const res = await supertest(app)
        .post('/api/event')
        .send(fakeEvent())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

    expect(res.body.id).not.toBeNull();
    expect(res.body.id).toEqual(jasmine.any(String));

    const list = await EventModel.find({ title: 'test-event-title' });
    expect(list.length).toEqual(1);
});

it('should remove event on DELETE /api/event', async () => {
    const model = new EventModel(fakeEvent());

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
    const model = new EventModel(fakeEvent());
    await model.save();

    const id = model._id;

    const res = await supertest(app)
        .put(`/api/event/${id}`)
        .send(Object.assign(fakeEvent(), {
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
        .send(fakeEvent())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            const valid = validate(res.body);
            expect(valid).toBeTruthy();
            expect(validate.errors).toBeNull();
        });
});
