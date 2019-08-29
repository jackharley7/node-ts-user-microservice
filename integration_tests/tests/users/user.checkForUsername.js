require('../../config/environmentConfig').bootstrap();

const app = require('../../../src/app/server');
const request = require('supertest').agent(app.listen());
const expect = require('chai').expect;
const assert = require('chai').assert;
const nock = require('nock');
const _ = require('lodash');
const knexfile = require('../../../database/knexfile');
const knex = () => ( require('knex')(knexfile.development) );

describe('1. User.checkForUsername:', function() {

  before(async () => {
    await knex().seed.run();
  });

  describe('\n 1.1 get', function() {

    it('must true if username is not taken', () => {
      return request
        .get(`/api/username/ehfruierv`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let user = response.body;
          assert.equal(user.isAvailable, true);
        });
    });

    it('must false if username is taken', () => {
      return request
        .get(`/api/username/1user`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let user = response.body;
          assert.equal(user.isAvailable, false);
        });
    });

  });

});
