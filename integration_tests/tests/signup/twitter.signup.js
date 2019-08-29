require('../../config/environmentConfig').bootstrap();

const app = require('../../../src/app/server');
const request = require('supertest').agent(app.listen());
const assert = require('chai').assert;
const nock = require('nock');
const knexfile = require('../../../database/knexfile');
const knex = () => ( require('knex')(knexfile.development) );

describe('1. Signup.create:', function() {

  /* ------------------------------------------------------------------------------------
    CREATE RESOURCE
  ------------------------------------------------------------------------------------ */

  describe('\n 1.1 get a twitter signup token', function() {

    beforeEach(async () => {
      await knex().seed.run();
    });

    it('MUST 400 if no oauthToken supplied in payload', async () => {
      return request
        .post(`/api/signup/twitter`)
        .send({
          oauthVerifier: 'oauthVerifier',
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          assert.equal(response.body.error, 'oauthToken must be included in payload');
        });
    });

    it('MUST 400 if no oauthVerifier supplied in payload', async () => {
      return request
        .post(`/api/signup/twitter`)
        .send({
          oauthToken: 'oauthToken',
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          assert.equal(response.body.error, 'oauthVerifier must be included in payload');
        });
    });

    it('MUST handle invalid access_token request', async () => {
      nock('https://api.twitter.com')
        .post('/oauth/access_token?oauth_verifier')
        .reply(401, 'Reverse auth credentials are invalid');
      
      return request
        .post(`/api/signup/twitter`)
        .send({
          oauthToken: 'oauthToken',
          oauthVerifier: 'oauthVerifier',
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(401)
        .expect(response => {
          let res = response.body;
          assert.equal(response.body.error, 'Reverse auth credentials are invalid');
        });
    });

    it('MUST handle error validating credentials', async () => {
      nock('https://api.twitter.com')
        .post('/oauth/access_token?oauth_verifier')
        .reply(200, 'oauth_token=sometoken&oauth_token_secret=somesecret&user_id=1009');

      nock('https://api.twitter.com/1.1')
        .get('/account/verify_credentials.json?skip_status=true&include_email=true')
        .reply(401, {"errors":[{"message":"unauthorized","code":401}]});

      return request
        .post(`/api/signup/twitter`)
        .send({
          oauthToken: 'oauthToken',
          oauthVerifier: 'oauthVerifier',
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(401)
        .expect(response => {
          assert.equal(response.body.error, 'unauthorized');
        });
    });
    
    it('MUST update twitter info and login if user already exists with twitterId', async () => {
      nock('https://api.twitter.com')
        .post('/oauth/access_token?oauth_verifier')
        .reply(200, 'oauth_token=sometoken&oauth_token_secret=somesecret&user_id=100');

      nock('https://api.twitter.com/1.1')
        .get('/account/verify_credentials.json?skip_status=true&include_email=true')
        .reply(200, {
          id: 100,
          id_str: '100',
          screen_name: 'some-twitter-handle',
          location: 'London',
          time_zone: 'M',
          verified: true,
          name: 'some name',
          email: '1@b.com',
        });

      return request
        .post(`/api/signup/twitter`)
        .send({
          oauthToken: 'oauthToken',
          oauthVerifier: 'oauthVerifier',
        })
        .then(async response => {
          assert.deepEqual(response.body.user, {
            name: 'A B',
            id: 1,
            avatar: null,
            email: '1@b.com'
          });
          const result = await knex().table('User').where({id: response.body.user.id}).first();
          assert.equal(result.twitterHandle, 'some-twitter-handle');
          assert.equal(result.twitterVerified, 1);
          assert.equal(typeof response.body.token, 'string');
        });
    });

    it('MUST update twitter info and login if user already exists with email from twitter user', async () => {
      nock('https://api.twitter.com')
        .post('/oauth/access_token?oauth_verifier')
        .reply(200, 'oauth_token=sometoken&oauth_token_secret=somesecret&user_id=200');

      nock('https://api.twitter.com/1.1')
        .get('/account/verify_credentials.json?skip_status=true&include_email=true')
        .reply(200, {
          id: 200,
          id_str: '200',
          screen_name: 'some-twitter-handle',
          location: 'London',
          time_zone: 'M',
          verified: true,
          name: 'some name',
          email: '2@b.com',
        });

      return request
        .post(`/api/signup/twitter`)
        .send({
          oauthToken: 'oauthToken',
          oauthVerifier: 'oauthVerifier',
        })
        .then(async response => {
          assert.deepEqual(response.body.user, {
            name: 'A B',
            id: 2,
            avatar: null,
            email: '2@b.com'
          });
          const result = await knex().table('User').where({id: response.body.user.id}).first();
          assert.equal(result.twitterHandle, 'some-twitter-handle');
          assert.equal(result.twitterVerified, 1);
          assert.equal(typeof response.body.token, 'string');
        });
    });

    it('MUST create user if one doesnt exist and login', async () => {
      nock('https://api.twitter.com')
        .post('/oauth/access_token?oauth_verifier')
        .reply(200, 'oauth_token=sometoken&oauth_token_secret=somesecret&user_id=123456');

      nock('https://api.twitter.com/1.1')
        .get('/account/verify_credentials.json?skip_status=true&include_email=true')
        .reply(200, {
          id: 123456,
          id_str: '123456',
          screen_name: 'some-twitter-handle',
          location: 'London',
          time_zone: 'M',
          verified: true,
          name: 'some name',
          email: 'nonexisting@b.com',
        });

      return request
        .post(`/api/signup/twitter`)
        .send({
          oauthToken: 'oauthToken',
          oauthVerifier: 'oauthVerifier',
        })
        .then(async response => {
          const user = response.body.user;
          assert.equal(user.email, 'nonexisting@b.com');
          assert.equal(user.name, 'some name');

          const result = await knex().table('User').where({id: response.body.user.id}).first();
          assert.equal(result.twitterHandle, 'some-twitter-handle');
          assert.equal(result.twitterVerified, 1);
          assert.equal(typeof response.body.token, 'string');
        });
    });

  });

});
