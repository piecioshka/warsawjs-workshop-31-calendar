const express = require('express');
const supertest = require('supertest');
const bodyParser = require('body-parser');
const Ajv = require('ajv');

const ajv = new Ajv({ schemaId: 'auto' });
const router = require('../web/routing/api.router');

let app = null;

beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    router(app);
});

const fake = () => ({
    test: true,
    title: 'test-event-title',
    description: 'test-event-description',
    time: new Date().toISOString(),
    notification: false
});

it('should response on POST /api/event', () => {
    return supertest(app)
        .post('/api/event')
        .send(fake())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.body.id).not.toBeNull();
            expect(res.body.id).toEqual(jasmine.any(String));
        });
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
