exports.up = function(knex, Promise) {
  return knex.schema
      .table('User', function (table) {
        table.string('twitterHandle').nullable();
        table.string('twitterId').nullable();
        table.boolean('twitterVerified').defaultTo(false);
      }).catch(function(error) {});
};

exports.down = function(knex, Promise) {
  return knex.schema
      .table('User', function (table) {
        table.dropColumn('twitterHandle');
        table.dropColumn('twitterId');
        table.dropColumn('twitterVerified');
      }).catch(function(error) {});
};
