const express = require('express');
const supertest = require('supertest');
const bodyParser = require('body-parser');
const Ajv = require('ajv');

const router = require('../src/web/routes/api.router');

const ajv = new Ajv({ schemaId: 'auto' });
let app = null;

beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    router(app);
});

it('should response on /api/subscriptions', () => {
    return supertest(app)
        .post('/api/subscriptions')
        .expect(200)
        .then((res) => {
            expect(res.body).not.toBeNull();
        });
});

it('should response on /api/subscriptions with schema valid response', () => {

    const schema = require('../docs/schemas/subscriptions.scheme.json');
    const validate = ajv.compile(schema);

    return supertest(app)
        .post('/api/subscriptions')
        .expect(200)
        .then((res) => {
            const valid = validate(res.body);
            expect(valid).toBeTruthy();
            expect(validate.errors).toBeNull();
        });

});
