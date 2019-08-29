exports.up = function(knex, Promise) {
  return knex.schema
        .createTableIfNotExists('Profile', function (table) {
          table.increments('id').primary();
          table.integer('userId');
          table.index('userId');
          table.foreign('userId').references('User.id');
          table.text('bio');
          table.string('website');
          table.string('locale');
          table.integer('countryId');
          table.integer('regionId');
          table.string('postcode');
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
        .dropTableIfExists('Profile')
    ]
  );
};
