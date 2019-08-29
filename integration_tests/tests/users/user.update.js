require('../../config/environmentConfig').bootstrap();

const app = require('../../../src/app/server');
const request = require('supertest').agent(app.listen());
const expect = require('chai').expect;
const assert = require('chai').assert;
const nock = require('nock');
const _ = require('lodash');
const knexfile = require('../../../database/knexfile');
const knex = () => ( require('knex')(knexfile.development) );
const moment = require('moment');

describe('1. User.update:', function() {

  /* ------------------------------------------------------------------------------------
    UPDATE USER
  ------------------------------------------------------------------------------------ */
  const userId = 1;

  describe('\n 1.1 update a user', function() {

    before(async () => {
      await knex().seed.run();
    });
  
    it('must 404 if not found', () => {
        return request
          .patch(`/api/user/100`)
          .send({
              name: 'O',
          })
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(404)
          .expect(response => {
            const status = response.status;
            assert.equal(status, 404);
          });
      });

      it('must not update suspended', () => {
        return request
          .patch(`/api/user/${userId}`)
          .send({
            suspended: true,
          })
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200)
          .expect(response => {
            let res = response.body;
            assert.equal(res.id, userId);
          });
      });

      it('must not update email', () => {
        return request
          .patch(`/api/user/${userId}`)
          .send({
            email: 'X@X.com',
          })
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200)
          .expect(response => {
            let res = response.body;
            assert.equal(res.email !== 'X@X.com', true);
            assert.equal(res.id, userId);
          });
      });

      it('must not update verified', () => {
        return request
          .patch(`/api/user/${userId}`)
          .send({
            verified: true,
          })
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200)
          .expect(response => {
            let res = response.body;
            assert.equal(res.id, userId);
          });
      });

      it('must not update verified', () => {
          const createdAt = moment().toISOString();
        return request
          .patch(`/api/user/${userId}`)
          .send({
            createdAt,
          })
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200)
          .expect(response => {
            let res = response.body;
            assert.equal(moment(res.createdAt).toISOString() !== createdAt, true);
            assert.equal(res.id, userId);
          });
      });

    it('must update name', () => {
      return request
        .patch(`/api/user/${userId}`)
        .send({
            name: 'X',
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let res = response.body;
          assert.equal(res.name, 'X');
          assert.equal(res.id, userId);
        });
    });

    it('must update avatar', () => {
      return request
        .patch(`/api/user/${userId}`)
        .send({
          avatar: 'X',
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let res = response.body;
          assert.equal(res.avatar, 'X');
          assert.equal(res.id, userId);
        });
    });

    it('must update progress correctly', () => {
      return request
        .patch(`/api/user/${userId}`)
        .send({
          avatar: 'X',
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let res = response.body;
          assert.equal(res.avatar, 'X');
          assert.equal(res.id, userId);
          assert.equal(res.profile.progress, 30);
        });
    });

  });

});
