const router = require('express').Router();
const { respond } = require('./route-helpers');
const Reviewer = require('../models/reviewer');
const { sign } = require('../util/ensure-auth');
const createEnsureAuth = require('../util/ensure-auth');

module.exports = router

    .get('verify', createEnsureAuth(), respond(
        () => Promise.resolve({ verified: true })
    ))

    .post('/signup', respond(
        req => {
            const { email, password } = req.body;
            delete req.body.password;

            return Reviewer.exists({ email })
                .then(exists => {
                    if(exists) {
                        throw {
                            status: 400,
                            error: 'email already exists'
                        };
                    }

                    const reviewer = new Reviewer(req.body);
                    reviewer.generateHash(password);
                    return reviewer.save();

                })
                .then(reviewer => {
                    return { token: sign(reviewer) };
                });
        }
    ));


