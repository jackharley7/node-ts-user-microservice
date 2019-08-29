require('../../config/environmentConfig').bootstrap();

const app = require('../../../src/app/server');
const request = require('supertest').agent(app.listen());
const expect = require('chai').expect;
const assert = require('chai').assert;
const nock = require('nock');
const _ = require('lodash');

const createUser = (name, id) => {
  return request
    .post('/api/user')
    .send({
      name,
      avatar: 'http://url.com',
      id,
    });
};

describe('1. User.search:', function() {

  before(() => {
    const promises = [
      createUser('Kimazx Greggsza', 9999991),
      createUser('Omar Littlezx', 9999992),
      createUser('Jimmyzx McNulty', 9999993),
      createUser('Stringer Bell', 9999994),
      createUser('Avon Barksdalezx', 9999995),
    ];
    return Promise.all(promises);
  });

  describe('\n 1.1 search', function() {

    it('must get correct number of results when searching firstName', () => {
      return request
        .get(`/api/user?me=9999992&searchTerm=Kimazx`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let results = response.body;
          assert.equal(results.data.length, 1);
          assert.equal(results.data[0].name, 'Kimazx Greggsza');
        });
    });

    it('must get correct number of results when searching lastName', () => {
      return request
        .get(`/api/user?me=9999992&searchTerm=Greggsza`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let results = response.body;
          assert.equal(results.data.length, 1);
          assert.equal(results.data[0].name, 'Kimazx Greggsza');
        });
    });

    it('must get an empty array back when no results found', () => {
      return request
        .get(`/api/user?me=9999992&searchTerm=kwjnfviurthvrn`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let results = response.body;
          assert.equal(results.data.length, 0);
        });
    });

  });

  describe('\n 1.2 pagination', function() {

    it('must get correct number of results', () => {
      return request
        .get(`/api/user?me=9999992&searchTerm=zx`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let results = response.body;
          assert.equal(results.data.length, 4);
        });
    });

    it('must get correct number of results from 1', () => {
      return request
        .get(`/api/user?me=9999992&searchTerm=zx&from=1`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let results = response.body;
          assert.equal(results.data.length, 3);
        });
    });

    it('must get correct count', () => {
      return request
        .get(`/api/user?me=9999992&searchTerm=zx&from=1`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let results = response.body;
          assert.equal(results.count, 4);
        });
    });

    it('must get one result', () => {
      return request
        .get(`/api/user?me=9999992&searchTerm=zx&qty=1`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          let results = response.body;
          assert.equal(results.count, 4);
          assert.equal(results.data.length, 1);
        });
    });

  });

});
