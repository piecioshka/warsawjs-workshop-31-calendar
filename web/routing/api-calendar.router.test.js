const express = require('express');
const supertest = require('supertest');
const Ajv = require('ajv');

const ajv = new Ajv({ schemaId: 'auto' });
const router = require('./api.router');

it('should response on /api/calendar', () => {

    const app = express();
    router(app);

    return supertest(app)
        .get('/api/calendar')
        .expect(200)
        .then((res) => {
            expect(res.text).not.toBeNull();
        });

});

it('should response on /api/calendar with schema valid response', () => {

    const schema = require('../../docs/schemas/calendar.scheme.json');
    const validate = ajv.compile(schema);

    const app = express();
    router(app);

    return supertest(app)
        .get('/api/calendar')
        .expect(200)
        .then((res) => {
            const valid = validate(res.text);
            expect(valid).toBeTruthy();
            expect(validate.errors).toBeNull();
            console.log(validate.errors);
        });

});
