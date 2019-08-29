require('../../config/environmentConfig').bootstrap();

const app = require('../../../src/app/server');
const request = require('supertest').agent(app.listen());
const expect = require('chai').expect;
const assert = require('chai').assert;
const nock = require('nock');
const _ = require('lodash');
const knexfile = require('../../../database/knexfile');
const knex = () => ( require('knex')(knexfile.development) );

describe('1. Signup.create:', function() {

  /* ------------------------------------------------------------------------------------
    CREATE RESOURCE
  ------------------------------------------------------------------------------------ */
  const payload = {
    email: '1a@b.com',
    verifyNumber: 123456,
  };

  describe('\n 1.1 create a temp signup user object', function() {

    before(async () => {
      await knex().seed.run();
    });

    it('must get error back when no email provided', () => {
      const data = _.clone(payload);
      delete data.email;

      return request
        .post(`/api/signup/verify`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let error = response.body;          
          assert.equal(response.body.email[0].keyword, 'required');
        });
    });

    it('must get error back when no verifyNumber provided', () => {
      const data = _.clone(payload);
      delete data.verifyNumber;

      return request
        .post(`/api/signup/verify`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let error = response.body;
          assert.equal(response.body.verifyNumber[0].keyword, 'required');
        });
    });

    it('must get error back when no verifyNumber is incorrect', () => {
      const data = _.clone(payload);
      data.email = 'bloop';

      return request
        .post(`/api/signup/verify`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(422)
        .expect(response => {
          let error = response.body;
          assert.equal(error.error, 'The verification code you entered is incorrect');
        });
    });

    it('must get error back if verification number has expired', () => {
      const data = _.clone(payload);
      data.email = '8a@b.com';

      return request
        .post(`/api/signup/verify`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(422)
        .expect(response => {
          let error = response.body;
          assert.equal(error.error, 'The verification code you entered has expired');
        });
    });

    it('must get error back if set from different tz', () => {
      const data = _.clone(payload);
      data.email = '9a@b.com';

      return request
        .post(`/api/signup/verify`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(422)
        .expect(response => {
          let error = response.body;
          assert.equal(error.error, 'The verification code you entered has expired');
        });
    });

    it('must set to verified', () => {
      const data = _.clone(payload);

      return request
        .post(`/api/signup/verify`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          const res = response.body;
          assert.equal(res.user.email, '1a@b.com');
          assert.equal(typeof res.token, 'string');
        });
    });

    it('must set to verified if set from different tz', () => {
      const data = _.clone(payload);
      data.email = '3a@b.com';

      return request
        .post(`/api/signup/verify`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          const res = response.body;
          assert.equal(res.user.email, '3a@b.com');
          assert.equal(typeof res.token, 'string');
        });
    });

  });

});
