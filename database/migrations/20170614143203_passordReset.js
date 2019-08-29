exports.up = function(knex, Promise) {
  return knex.schema
      .table('User', function (table) {
        table.string('passwordReset').nullable();
        table.string('passwordResetTimeout').nullable();
      }).catch(function(error) {});
};

exports.down = function(knex, Promise) {
  return knex.schema
      .table('User', function (table) {
        table.dropColumn('passwordReset');
        table.dropColumn('passwordResetTimeout');
      }).catch(function(error) {});
};
