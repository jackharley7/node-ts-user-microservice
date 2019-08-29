const createUser = (i) => {
  return {
    name: 'A B',
    email: `${i}@b.com`,
    username: `${i}user`,
    twitterHandle: `${i}screenname`,
    password: '$2a$10$U63iAawFr4aijK9vWLFS/OU522INFUqMAl/RocUrD7BAzFXJbOU9m',
  }
};

module.exports = (...ids) => {
  const users = ids.map(createUser);
  users[0].twitterId = `${ids[0]}00`;
  return users;
};
