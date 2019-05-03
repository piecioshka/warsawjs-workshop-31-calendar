const express = require('express');
const supertest = require('supertest');

const router = require('../src/web/routes/base.router');

it('should response on /', () => {
    let app = express();
    router(app);

    return supertest(app)
        .get('/')
        .expect(200)
        .then((res) => {
            expect(res.body.status).toEqual('ok');
        });
});
