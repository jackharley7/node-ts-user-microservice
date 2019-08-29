require('../../config/environmentConfig').bootstrap();

const app = require('../../../src/app/server');
const request = require('supertest').agent(app.listen());
const assert = require('chai').assert;
const nock = require('nock');
const knexfile = require('../../../database/knexfile');
const knex = () => ( require('knex')(knexfile.development) );

const twitterUser = {
  "id": 828298809658728400,
  "id_str": "828298809658728451",
  "name": "Jack Harley",
  "screen_name": "examplescreenname",
  "location": "",
  "description": "",
  "url": null,
  "entities": {
    "description": {
      "urls": []
    }
  },
  "protected": false,
  "followers_count": 0,
  "friends_count": 0,
  "listed_count": 0,
  "created_at": "Sun Feb 05 17:46:40 +0000 2017",
  "favourites_count": 0,
  "utc_offset": null,
  "time_zone": null,
  "geo_enabled": false,
  "verified": false,
  "statuses_count": 0,
  "lang": "en-gb",
  "contributors_enabled": false,
  "is_translator": false,
  "is_translation_enabled": false,
  "profile_background_color": "F5F8FA",
  "profile_background_image_url": null,
  "profile_background_image_url_https": null,
  "profile_background_tile": false,
  "profile_image_url": "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
  "profile_image_url_https": "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
  "profile_link_color": "1DA1F2",
  "profile_sidebar_border_color": "C0DEED",
  "profile_sidebar_fill_color": "DDEEF6",
  "profile_text_color": "333333",
  "profile_use_background_image": true,
  "has_extended_profile": false,
  "default_profile": true,
  "default_profile_image": true,
  "following": null,
  "follow_request_sent": null,
  "notifications": null,
  "translator_type": "none"
};

describe('1. Signup.create:', function() {

  /* ------------------------------------------------------------------------------------
    CREATE RESOURCE
  ------------------------------------------------------------------------------------ */

  describe('\n 1.1 get a twitter signup token', function() {

    beforeEach(async () => {
      await knex().seed.run();
    });

    it('MUST get user by screen_name', async () => {
      nock('https://api.twitter.com/1.1')
        .get('/users/lookup.json?screen_name=examplescreenname')
        .reply(200, {"data":[twitterUser]});

      return request
        .get(`/api/twitter/user?screen_name=examplescreenname`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(response => {
          assert.equal(response.body, twitterUser);
        });
    });

  });

});
