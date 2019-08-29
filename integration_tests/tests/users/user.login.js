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

describe('1. User.create:', function() {

  /* ------------------------------------------------------------------------------------
    CREATE RESOURCE
  ------------------------------------------------------------------------------------ */
  const payload = {
    username: 'newusername',
    password: 'P@ssword123',
    repeatedPassword: 'P@ssword123',
  };

  describe('\n 1.1 create a user object', function() {

    beforeEach(async () => {
      await knex().seed.run();
    });

    it('must get error back when no tempUserId provided', () => {
      const data = _.clone(payload);

      return request
        .post(`/api/user`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let error = response.body;
          assert.equal(error.error, 'must include tempUserId');
        });
    });

  });

});

const bcryptCompare = (password, hash) => (
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  })
);
