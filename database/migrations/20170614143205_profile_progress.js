exports.up = function(knex, Promise) {
  return knex.schema
      .table('Profile', function (table) {
        table.integer('progress').defaultTo(0);
      }).catch(function(error) {});
};

exports.down = function(knex, Promise) {
  return knex.schema
      .table('Profile', function (table) {
        table.dropColumn('progress');
      }).catch(function(error) {});
};
