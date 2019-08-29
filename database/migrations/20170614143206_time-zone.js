exports.up = function(knex, Promise) {
  return knex.schema
      .table('User', function (table) {
        table.string('timeZone');
      }).catch(function(error) {});
};

exports.down = function(knex, Promise) {
  return knex.schema
      .table('User', function (table) {
        table.dropColumn('timeZone');
      }).catch(function(error) {});
};
