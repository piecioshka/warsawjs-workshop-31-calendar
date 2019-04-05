const express = require('express');
const supertest = require('supertest');

const router = require('./base.router');

it('should response on /', () => {

    const app = express();
    router(app);

    return supertest(app)
        .get('/')
        .expect(200)
        .then((res) => {
            expect(res.text).toBe('ok');
        });

});
