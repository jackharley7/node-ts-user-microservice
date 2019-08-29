require('../../config/environmentConfig').bootstrap();

const app = require('../../../src/app/server');
const request = require('supertest').agent(app.listen());
const expect = require('chai').expect;
const assert = require('chai').assert;
const nock = require('nock');
const _ = require('lodash');
const knexfile = require('../../../database/knexfile');
const knex = () => ( require('knex')(knexfile.development) );

describe('1. User.changePassword:', function() {

  before(async () => {
    await knex().seed.run();
  });

  describe('\n 1.1 get', function() {

    it('must throw error if passwords dont match', () => {
      return request
        .post(`/api/user/1/changepassword`)
        .send({
          oldPassword: 'hi',
          newPassword: 'new1',
          newPasswordRepeat: 'new2',
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let user = response.body;
          assert.equal(user.error, 'passwords must match');
        });
    });

    it('must throw 401 current password not correct', () => {
      return request
        .post(`/api/user/1/changepassword`)
        .send({
          oldPassword: 'wrongPassword',
          newPassword: 'new1234ABC',
          newPasswordRepeat: 'new1234ABC',
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(401)
        .expect(response => {
          let user = response.body;
          assert.equal(user.error, 'old password incorrect');
        });
    });

    it('must throw 401 current password not correct', () => {
      return request
        .post(`/api/user/1/changepassword`)
        .send({
          oldPassword: 'P@ssword123',
          newPassword: 'new1234ABC',
          newPasswordRepeat: 'new1234ABC',
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let user = response.body;
          assert.equal(user.status, 'done');
        });
    });

  });

});
