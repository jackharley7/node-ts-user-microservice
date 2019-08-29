exports.up = function(knex, Promise) {
  return knex.schema
        .createTableIfNotExists('User', function (table) {
          table.increments('id').primary();
          table.string('name');
          table.string('username');
          table.unique('username');
          table.index('username');
          table.string('email');
          table.unique('email');
          table.index('email');
          table.string('password');
          table.string('avatar');
          table.boolean('verified').defaultTo(0);
          table.boolean('suspended').defaultTo(0);
          table.timestamp('createdAt').defaultTo(knex.fn.now());
        })
        .catch(function(error) {
          console.log(error);
        });

};

exports.down = function(knex, Promise) {
  return Promise.all(
    [
      knex.schema
        .dropTableIfExists('User')
    ]
  );
};
