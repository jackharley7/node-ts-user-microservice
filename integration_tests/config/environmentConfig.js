module.exports = {
  bootstrap: function () {
    process.env.DB_CLIENT = 'mysql';
    process.env.DB_HOST = 'discussdevdb';
    process.env.DB_USER = 'root';
    process.env.DB_PASSWORD = '';
    process.env.DB_NAME = 'DiscussUser';
    process.env.DB_CHARSET = 'utf8';
    process.env.DB_DEBUG = 'false';
    process.env.FACEBOOK_APP_ID = '1234567890987654321';
    process.env.TOKEN_SECRET = 'itsasecret';
    process.env.TEMP_TOKEN_SECRET = 'itsadifferentsecret';
    process.env.NODE_ENV = 'integrationtest';
    process.env.GALLERY_SERVICE_URL = 'http://gallery-service:8080/api/';
    process.env.TZ = 'UTC';
    process.env.TWITTER_CONSUMER_API = 'ur65r65v5d5';
    process.env.TWITTER_CONSUMER_SECRET = 'bft6f6fb5f5ydd5bd45';
    process.env.AWS_AVATAR_BUCKET = 'some-avatar-bucket';
    process.env.SPARK_POST_API_KEY = 'asdfghjk';
  }
};
