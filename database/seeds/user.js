const user = require('./seedData/User');
const userTemp = require('./seedData/UserTemp');

exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  await knex('User').truncate();
  await knex('UserTemp').truncate();
  await knex('Profile').truncate();
  await knex('User').insert(user(1,2,3,4,5,6,7));
  await knex('UserTemp').insert([...userTemp(1,2,3,4,5,6,7), {
    verifyNumber: 123456,
    email: `8a@b.com`,
    createdAt: '2017-09-03 19:01:38',
  }, {
    verifyNumber: 123456,
    email: `9a@b.com`,
    timeZone: 'Europe/London',
    createdAt: '2017-09-03 19:01:38',
  }, {
    verifyNumber: 123456,
    email: `10a@b.com`,
    timeZone: 'Europe/London',
    createdAt: '2017-09-03 19:01:38',
    verified: true,
  }]);
  await knex('Profile').insert([1,2,3,4,5,6,7].map(id => ({userId: id})));
  return;
};
