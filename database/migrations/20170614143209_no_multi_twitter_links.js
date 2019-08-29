exports.up = function(knex, Promise) {
  return knex.schema
      .table('User', function (table) {
        table.unique('twitterId');
      }).catch(function(error) {});
};

exports.down = function(knex, Promise) {
  return knex.schema
      .table('User', function (table) {
        table.dropUnique('twitterId');
      }).catch(function(error) {});
};
