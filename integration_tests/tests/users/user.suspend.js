require('../../config/environmentConfig').bootstrap();

const app = require('../../../src/app/server');
const request = require('supertest').agent(app.listen());
const expect = require('chai').expect;
const assert = require('chai').assert;
const nock = require('nock');
const _ = require('lodash');
const knexfile = require('../../../database/knexfile');
const knex = () => ( require('knex')(knexfile.development) );

describe('1. User.suspend:', function() {

  before(async () => {
    await knex().seed.run();
  });

  describe('\n 1.1 suspend', function() {

    it('must return a 404 when user not found', () => {
      return request
        .delete(`/api/user/12345678`)
        .expect(404)
        .expect(response => {
          let err = response.status;
          assert.equal(err, 404);
        });
    });

    it('must return a user', () => {
      return request
        .delete(`/api/user/1`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          return request
            .get(`/api/user/1`)
            .expect(404)
            .expect(response => {
              let err = response.status;
              assert.equal(err, 404);
            });
        });
    });

  });

});
