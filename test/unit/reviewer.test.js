const { assert } = require('chai');
//const request = require('./request');
const { getErrors } = require('./helpers');
const Reviewer = require('../../lib/models/reviewer');


// add signup stuff
//
//

describe('Reviewer model', () => {

    it('validates good REVIEWER model', () => {
        const data = {
            name: 'Betty Crocker',
            email: 'crock@email.com',
            company: 'Pancake Hut',
            roles: ['admin']    
        };
        
        const reviewer = new Reviewer(data);
        const json = reviewer.toJSON();
        delete json._id;

        assert.equal(reviewer.email, data.email);
        assert.deepEqual(json, data);
        assert.isUndefined(URLSearchParams.password, 'password should not be set');
        //assert.isUndefined(reviewer.validateSync());
    }); 

    it('validates required name, email, company, hash ', () => {
        const reviewer = new Reviewer({});
        const errors = getErrors(reviewer.validateSync(), 4);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.email.kind, 'required');
        assert.equal(errors.company.kind, 'required');
        assert.equal(errors.hash.kind, 'required');
    });
});