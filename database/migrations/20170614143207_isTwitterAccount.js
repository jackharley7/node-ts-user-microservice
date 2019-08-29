exports.up = function(knex, Promise) {
  return knex.schema
      .table('User', function (table) {
        table.boolean('isTwitterAccount').defaultTo(false);
      }).catch(function(error) {});
};

exports.down = function(knex, Promise) {
  return knex.schema
      .table('User', function (table) {
        table.dropColumn('isTwitterAccount');
      }).catch(function(error) {});
};
