const configuration = {
  client: process.env.DB_CLIENT,
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    charset : process.env.DB_CHARSET,
    options: process.env.ENABLE_DB_SSL ? {
      port: 1433,
      database: process.env.DB_NAME,
      encrypt: true,
    } : undefined,
  },
  debug: process.env.DB_DEBUG !== undefined ? (process.env.DB_DEBUG === 'true') : true,
}

module.exports = {
  development: Object.assign({}, configuration, {
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'example_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  })
};
