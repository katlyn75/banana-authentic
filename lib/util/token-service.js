const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET || 'changesme';

module.exports = {
    sign(reviewer) {
        const payload = {
            id: reviewer._id,
            //roles: user.roles
        };
        return jwt.sign(payload, APP_SECRET);
    },
    verify(token) {
        //this returns the payload, or doesn't
        return jwt.verify(token, APP_SECRET);    
    }
};
