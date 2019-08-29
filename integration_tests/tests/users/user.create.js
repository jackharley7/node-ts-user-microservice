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

    it('must get error back when no username provided', () => {
      const data = _.clone(payload);
      delete data.username;

      return request
        .post(`/api/user?tempUserId=1`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let error = response.body;
          assert.equal(response.body.username[0].keyword, 'required');
        });
    });

    it('must get error back when username already taken', () => {
      const data = _.clone(payload);
      data.username = '1user';

      return request
        .post(`/api/user?tempUserId=1`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(409)
        .expect(response => {
          let error = response.body;
          assert.equal(error.error, 'a user with this username already exists, please try another');
        });
    });

    it('must get error back when no password provided', () => {
      const data = _.clone(payload);
      delete data.password;

      return request
        .post(`/api/user?tempUserId=1`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let error = response.body;
          assert.equal(response.body.password[0].keyword, 'required');
        });
    });

    it('must get error back when no repeatPassword provided', () => {
      const data = _.clone(payload);
      delete data.repeatedPassword;

      return request
        .post(`/api/user?tempUserId=1`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let error = response.body;
          assert.equal(response.body.repeatedPassword[0].keyword, 'required');
        });
    });

    it('must get error back when passwords dont match', () => {
      const data = _.clone(payload);
      data.repeatedPassword = 'hi';

      return request
        .post(`/api/user?tempUserId=1`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let error = response.body;
          assert.equal(error.error, 'passwords must match');
        });
    });

    it('must get error back when passwords not greater then 8 characters', () => {
      const data = _.clone(payload);
      data.password = '1234567';
      data.repeatedPassword = '1234567';

      return request
        .post(`/api/user?tempUserId=1`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let error = response.body;
          assert.equal(error.error, 'password must be greater than 7 characters');
        });
    });

    it('must get error back when passwords not greater then 8 characters', () => {
      const data = _.clone(payload);
      data.password = 'qwertyuiopA';
      data.repeatedPassword = 'qwertyuiopA';

      return request
        .post(`/api/user?tempUserId=1`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let error = response.body;
          assert.equal(error.error, 'password must contain at least one number');
        });
    });

    it('must get error back when passwords not greater then 8 characters', () => {
      const data = _.clone(payload);
      data.password = 'qwertyuiop1';
      data.repeatedPassword = 'qwertyuiop1';

      return request
        .post(`/api/user?tempUserId=1`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let error = response.body;
          assert.equal(error.error, 'password must contain at least one uppercase letter');
        });
    });

    it('must get error back when passwords not greater then 8 characters', () => {
      const data = _.clone(payload);
      data.password = 'ASDFGHJKL1';
      data.repeatedPassword = 'ASDFGHJKL1';

      return request
        .post(`/api/user?tempUserId=1`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let error = response.body;
          assert.equal(error.error, 'password must contain at least one lowercase letter');
        });
    });

    it('must get error back when temp user not found', () => {
      const data = _.clone(payload);

      return request
        .post(`/api/user?tempUserId=456789876`)
        .send(data)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(404)
        .expect(response => {
          let status = response.status;
          assert.equal(response.body.error, 'temporary user not found');
          assert.equal(status, 404);
        });
    });

    it('MUST successfully create a user and return a token', function() {
      const data = _.clone(payload);

      return request
        .post(`/api/user?tempUserId=1`)
        .send(data)
        .then(async response => {
          let res = response.body;
          const result = await knex().table('Profile').where({userId: res.user.id}).first();
          assert.equal(res.user.email, '1a@b.com');
          assert.equal(typeof res.user.id, 'number');
          assert.equal(typeof res.token, 'string');
          assert.equal(result.userId, res.user.id);
        });
    });

    it('MUST successfully create a user and delete the temp user', function() {
      const data = _.clone(payload);

      return request
        .post(`/api/user?tempUserId=2`)
        .send(data)
        .then(async response => {
          const result = await knex().table('UserTemp').where({id: 2}).first();
          assert.equal(result, undefined);
        });
    });

    it('MUST successfully hash the password (and not return to user)', function() {
      const data = _.clone(payload);

      return request
        .post(`/api/user?tempUserId=3`)
        .send(data)
        .then(async response => {
          let res = response.body;
          const result = await knex().table('User').where({email: '3a@b.com'}).first();
          const password = await bcryptCompare(data.password, result.password);          
          assert.equal(password, true);
          assert.equal(res.user.password, null);
        });
    });

    it('MUST successfully create a profile', function() {
      const data = _.clone(payload);

      return request
        .post(`/api/user?tempUserId=1`)
        .send(data)
        .then(async response => {
          let res = response.body;
          assert.equal(res.user.profile.progress, 0);
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
