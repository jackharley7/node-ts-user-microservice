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

    it('must return user with id of 0 if not found', () => {
      const message = new user_pb.GetUserByTwitterScreenNameMessage();
      message.setScreenname('name-not-in-db');
  
      return new Promise((resolve, reject) => {
        client.getUserByTwitterScreenName(message, (err, res) => {

          if (err) {
            reject(err);
            return;
          }
          const user = res.toObject().user;
          assert.equal(user.id, 0);
          resolve(res.toObject());
        });
      });
    });

    it('must return corrent user for 1screenname', () => {
      const message = new user_pb.GetUserByTwitterScreenNameMessage();
      message.setScreenname('1screenname');
  
      return new Promise((resolve, reject) => {
        client.getUserByTwitterScreenName(message, (err, res) => {

          if (err) {
            reject(err);
            return;
          }
          const user = res.toObject().user;
          assert.equal(user.id, 1);
          resolve(res.toObject());
        });
      });
    });

  });

});
