require('../../config/environmentConfig').bootstrap();

const app = require('../../../src/app/server');
const request = require('supertest').agent(app.listen());
const expect = require('chai').expect;
const assert = require('chai').assert;
const nock = require('nock');
const _ = require('lodash');
const knexfile = require('../../../database/knexfile');
const knex = () => ( require('knex')(knexfile.development) );

describe('1. User.getUploadUrl:', function() {

  describe('\n 1.1 get', function() {

    it('must throw error if passwords dont match', () => {
      return request
        .get(`/api/user/1/upload/avatar`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .expect(response => {
          let user = response.body;
          assert.equal(user.error, 'must include mimeType in query');
        });
    });

    it('must throw error if passwords dont match', () => {
      return request
        .get(`/api/user/1/upload/avatar?mimeType=png`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let res = response.body;
          assert.equal(res.signedUrl, 'https://s3.amazonaws.com/');
        });
    });

  });

});
