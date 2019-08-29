require('../../config/environmentConfig').bootstrap();

const app = require('../../../src/app/server');
const request = require('supertest').agent(app.listen());
const expect = require('chai').expect;
const assert = require('chai').assert;
const nock = require('nock');
const _ = require('lodash');
const knexfile = require('../../../database/knexfile');
const knex = () => ( require('knex')(knexfile.development) );

describe('1. User.get:', function() {

  before(async () => {
    await knex().seed.run();
  });

  describe('\n 1.1 get', function() {

    it('must return a 404 when user not found', () => {
      return request
        .get(`/api/user/14`)
        .expect(404)
        .expect(response => {
          let err = response.status;
          assert.equal(err, 404);
        });
    });

    it('must return a user', () => {
      return request
        .get(`/api/user/1`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let user = response.body;

          assert.equal(user.name, 'A B');
          assert.equal(user.email, '1@b.com');
          assert.equal(user.id, 1);
        });
    });

    it('must return a user with a profile', () => {
      return request
        .get(`/api/user/1?expand=profile`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let user = response.body;

          assert.equal(user.name, 'A B');
          assert.equal(user.email, '1@b.com');
          assert.equal(user.id, 1);
        });
    });

  });

});
