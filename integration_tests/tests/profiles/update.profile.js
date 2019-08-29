require('../../config/environmentConfig').bootstrap();

const app = require('../../../src/app/server');
const request = require('supertest').agent(app.listen());
const expect = require('chai').expect;
const assert = require('chai').assert;
const nock = require('nock');
const _ = require('lodash');
const knexfile = require('../../../database/knexfile');
const knex = () => ( require('knex')(knexfile.development) );
const bcrypt = require('bcrypt-nodejs');

describe('1. Profile.update:', function() {

  /* ------------------------------------------------------------------------------------
    CREATE RESOURCE
  ------------------------------------------------------------------------------------ */
  const payload = {
    locale: 'gb',
  };

  describe('\n 1.1 update a profile object', function() {

    beforeEach(async () => {
      await knex().seed.run();
    });

    it('must get 404 back when no user found', () => {
      const data = _.clone(payload);

      return request
        .patch(`/api/user/1003/profile`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(404)
        .expect(response => {
          let error = response.status;
          assert.equal(error, 404);
        });
    });

    it('must update a profile', () => {
      const data = _.clone(payload);

      return request
        .patch(`/api/user/1/profile`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let res = response.body;
          assert.equal(res.profile.locale, 'gb');
        });
    });

    it('must update a profiles progress correctly when bio is added', () => {
      const data = {
        bio: 'bio',
      };

      return request
        .patch(`/api/user/1/profile`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let res = response.body;
          assert.equal(res.profile.bio, 'bio');
          assert.equal(res.profile.progress, 40);
        });
    });

  });

});
