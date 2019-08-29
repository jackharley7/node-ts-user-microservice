require('../../config/environmentConfig').bootstrap();

const app = require('../../../src/app/server');
const request = require('supertest').agent(app.listen());
const expect = require('chai').expect;
const assert = require('chai').assert;
const nock = require('nock');
const _ = require('lodash');
const knexfile = require('../../../database/knexfile');
const knex = () => ( require('knex')(knexfile.development) );
const moment = require('moment');

describe('1. Signup.create:', function() {

  /* ------------------------------------------------------------------------------------
    CREATE RESOURCE
  ------------------------------------------------------------------------------------ */
  const payload = {
    name: 'X Y',
    avatar: 'http://url.com',
    email: 'a@b.com',
    timeZone: 'London',
    id: Math.floor(Math.random() * 100000000),
  };

  describe('\n 1.1 create a temp signup user object', function() {

    beforeEach(async () => {
      await knex().seed.run();
    });

    it('must get error back when no email and no timeZone provided', () => {
      const data = _.clone(payload);
      delete data.email;
      delete data.timeZone;

      return request
        .post(`/api/signup`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let error = response.body;
          assert.equal(response.body.email[0].keyword, 'required');
          assert.equal(response.body.timeZone[0].keyword, 'required');
        });
    });

    it('must get error back when no email provided', () => {
      const data = _.clone(payload);
      delete data.email;

      return request
        .post(`/api/signup`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let error = response.body;
          assert.equal(response.body.email[0].keyword, 'required');
        });
    });

    it('must get error back when no timeZone provided', () => {
      const data = _.clone(payload);
      delete data.timeZone;

      return request
        .post(`/api/signup`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let error = response.body;
          assert.equal(response.body.timeZone[0].keyword, 'required');
        });
    });

    it('must get error back when email address already used', () => {
      const data = _.clone(payload);
      data.email = '1@b.com';

      return request
        .post(`/api/signup`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(409)
        .expect(response => {
          const status = response.status;          
          assert.equal(status, 409);
        });
    });

    it('MUST successfully create a user', function() {
      const data = _.clone(payload);

      return request
        .post(`/api/signup`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
        .expect(response => {
          let res = response.body;
          assert.equal(res.user.email, payload.email);
          assert.equal(res.token, null);
          assert.equal(res.user.verifyNumber, undefined);
        });
    });

    it('MUST successfully update a usertemps createdAt', async () => {
      const data = _.clone(payload);
      const result = await knex().table('UserTemp').where({email: '2a@b.com'}).first();

      await new Promise(resolve => setTimeout(resolve, 1000));

      return request
        .post(`/api/signup`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
        .expect(response => {
          let user = response.body;
          assert.equal(
            moment(result.createdAt).toISOString() !== moment(user.user.createdAt).toISOString(),
            true
          );
          assert.equal(user.user.verifyNumber, undefined);
        });
    });

    it('MUST return a tempuser and a token if email already verified', async () => {
      const data = _.clone(payload);
      data.email = '10a@b.com';

      return request
        .post(`/api/signup`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let res = response.body;
          assert.equal(res.user.email, '10a@b.com');
          assert.equal(typeof res.token, 'string');
          assert.equal(res.user.verifyNumber, undefined);
        });
    });

  });

});
