const { assert } = require('chai');
const Reviewer = require('../../lib/models/Reviewer');
const { getErrors } = require('./helpers');

describe('Reviewer model', () => {
    it('is a good, valid model', () => {
        const info = {
            name: 'Roger Ebert',
            company: 'rogerebert.com'
        };

        const reviewer = new Reviewer(info);
        info._id = reviewer._id;
        assert.deepEqual(reviewer.toJSON(), info);
        assert.isUndefined(reviewer.validateSync());
    });

    const data = {
        email: 'myname@me.com',
    
    };
    const password = 'qwerty';
    let reviewer = null;
    beforeEach(() => {
        reviewer = new Reviewer(data);
        reviewer.generateHash(password);
    });

    it('creates a hash from password', () => {
        assert.ok(reviewer.hash);
        assert.notEqual(reviewer.hash, password);
    });

    it('has required fields', () => {
        const reviewer = new Reviewer({});
        const errors = getErrors(reviewer.validateSync(), 2);
        assert.strictEqual(errors.name.kind, 'required');
        assert.strictEqual(errors.company.kind, 'required');
    });

});