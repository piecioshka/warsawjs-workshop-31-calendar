const express = require('express');
const supertest = require('supertest');
const bodyParser = require('body-parser');

const router = require('../web/routing/base.router');

let app = null;

beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    router(app);
});

it('should response on /', () => {
    return supertest(app)
        .get('/')
        .expect(200)
        .then((res) => {
            expect(res.body.status).toEqual('ok');
        });
});
