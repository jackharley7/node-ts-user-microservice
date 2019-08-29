require('../../config/environmentConfig').bootstrap();

const app = require('../../../src/app/server');
const request = require('supertest').agent(app.listen());
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

  describe('\n 1.1 get a twitter signup token', function() {

    it('MUST return token', async () => {

      nock('https://api.twitter.com')
        .post('/oauth/request_token')
        .reply(200, 'oauth_token=sometoken&oauth_token_secret=somesecret&oauth_callback_confirmed=true');
      return request
        .get(`/api/signup/twitter/token`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let res = response.body;
          assert.equal(res.oauth_token, 'sometoken');
          assert.equal(res.oauth_token_secret, 'somesecret');
          assert.equal(res.oauth_callback_confirmed, true);
        });
    });

  });

});
