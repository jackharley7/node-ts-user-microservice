require('../../../config/environmentConfig').bootstrap();

const app = require('../../../../src/app/server');
const request = require('supertest').agent(app.listen());
const expect = require('chai').expect;
const assert = require('chai').assert;
const nock = require('nock');
const _ = require('lodash');
const knexfile = require('../../../../database/knexfile');
const knex = () => ( require('knex')(knexfile.development) );
const user_grpc_pb = require('./__generated__/user_grpc_pb');
const user_pb = require('./__generated__/user_pb');
const grpc = require('grpc');

describe('1. GRPC:', function() {

  let client = null;

  before(async () => {
    await knex().seed.run();
    client = new user_grpc_pb.UserServiceClient('discuss-user-service:50051', grpc.credentials.createInsecure());
  });

  after(async () => {
    client.close();
  });

  describe('\n 1.1 User.getByTwitterScreenname', function() {

    it('must return an empty array when no users found', () => {
      const message = new user_pb.GetUsersByIdsMessage();
      message.setUseridsList([23444, 43435]);
  
      return new Promise((resolve, reject) => {
        client.getUsersByIds(message, (err, res) => {

          if (err) {
            reject(err);
            return;
          }
          const result = res.toObject();
          assert.equal(result.usersList.length, 0);
          resolve(res.toObject());
        });
      });
    });

    it('must return users with ids 1 and 2 when correct ids passed', () => {
      const message = new user_pb.GetUsersByIdsMessage();
      message.setUseridsList([2, 4]);
  
      return new Promise((resolve, reject) => {
        client.getUsersByIds(message, (err, res) => {

          if (err) {
            reject(err);
            return;
          }
          const result = res.toObject();
          assert.equal(result.usersList.length, 2);
          assert.equal(result.usersList[0].id, 2);
          assert.equal(result.usersList[1].id, 4);
          resolve(res.toObject());
        });
      });
    });

    it('must return users with ids 1 and 2 when correct ids passed plus one wrong one', () => {
      const message = new user_pb.GetUsersByIdsMessage();
      message.setUseridsList([2, 4, 9487569]);
  
      return new Promise((resolve, reject) => {
        client.getUsersByIds(message, (err, res) => {

          if (err) {
            reject(err);
            return;
          }
          const result = res.toObject();
          assert.equal(result.usersList.length, 2);
          assert.equal(result.usersList[0].id, 2);
          assert.equal(result.usersList[1].id, 4);
          resolve(res.toObject());
        });
      });
    });

  });

});
