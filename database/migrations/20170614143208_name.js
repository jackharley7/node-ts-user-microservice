exports.up = function(knex, Promise) {
  return knex.schema
      .table('UserTemp', function (table) {
        table.string('name');
      }).catch(function(error) {});
};

exports.down = function(knex, Promise) {
  return knex.schema
      .table('UserTemp', function (table) {
        table.dropColumn('name');
      }).catch(function(error) {});
};
