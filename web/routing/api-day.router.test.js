const express = require('express');
const supertest = require('supertest');
const Ajv = require('ajv');

const ajv = new Ajv({ schemaId: 'auto' });
const router = require('./api.router');

it('should response on /api/day', () => {

    const app = express();
    router(app);

    return supertest(app)
        .get('/api/day')
        .expect(200)
        .then((res) => {
            expect(res.text).not.toBeNull();
        });

});

xit('should response on /api/day with schema valid response', () => {

    const schema = require('../../docs/schemas/day.scheme.json');
    const validate = ajv.compile(schema);

    const app = express();
    router(app);

    return supertest(app)
        .get('/api/day')
        .expect(200)
        .then((res) => {
            const valid = validate(res.text);
            expect(valid).toBeTruthy();
            expect(validate.errors).toBeNull();
            console.log(validate.errors);
        });

});
