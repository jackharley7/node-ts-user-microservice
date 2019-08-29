const createUser = (i, tz = 'Europe/London') => {
  return {
    verifyNumber: 123456,
    timeZone: tz,
    email: `${i}a@b.com`,
  }
};

module.exports = (...ids) => (
  ids.map(createUser)
);
