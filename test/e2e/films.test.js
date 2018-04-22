const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
// const Film = require('../../lib/models/Film');

describe('films API', () => {

    let emma = {
        name: 'Emma Thompson',
        dob: new Date(1959, 3, 15).toJSON(),
        pob: 'London, UK'
    };

    let sense = {
        title: 'Sense and Sensibility',
        studio: 1234546,
        released: 1995,
        cast: []
    };

    let incredibles = {
        title: 'The Incredibles',
        studio: 3940382,
        released: 2004,
        cast: []
    };

    before(() => dropCollection('actors'));
    before(() => dropCollection('films'));

    before(() => {
        return request.post('/actors')
            .send(emma)
            .then(({ body }) => {
                emma = body;
            });
    });

    before(() => {
        return request.post('/films')
            .send(incredibles)
            .then(({ body }) => {
                incredibles = body;
            });
    });

    it.only('saves a film', () => {
        sense.cast = [{ part: 'Elinor Dashwood', actor: emma._id }];
        return request.post('/films')
            .send(sense)
            .then(({ body }) => {
                const { _id, __v } = body;
                sense.cast[0]._id = body.cast[0]._id;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    ...sense,
                    _id,
                    __v,
                });
                sense = body;
            });
    });

    it.only('gets all films', () => {
        return request.get('films')
            .then(({ body }) => {

            });
    });

});