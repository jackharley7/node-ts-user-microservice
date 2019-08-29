'use strict';

export default {
  port: process.env.SERVER_PORT || 8080,
  ip: undefined,
  database: {
    client: process.env.DB_CLIENT,
    timezone: 'UTC',
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
    debug: true,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    s3: {
      bucket: {
        avatar: process.env.AWS_AVATAR_BUCKET,
      },
      urlExpires: 60 * 5 * 1000,
    },
  },
  token: {
    secret: process.env.TOKEN_SECRET || '',
    tempUserSecret: process.env.TEMP_TOKEN_SECRET || '',
  },
  email: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
  twitter: {
    consumerApiKey: process.env.TWITTER_CONSUMER_API,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  },
  sparkpost: {
    apiKey: process.env.SPARK_POST_API_KEY,
  },
};
