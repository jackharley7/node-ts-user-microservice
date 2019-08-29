exports.up = function(knex, Promise) {
  return knex.schema
        .createTableIfNotExists('UserTemp', function (table) {
          table.increments('id').primary();
          table.string('email');
          table.unique('email');
          table.index('email');
          table.integer('verifyNumber');
          table.boolean('verified');
          table.string('timeZone');
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
        .dropTableIfExists('UserTemp')
    ]
  );
};
