import * as request from 'request-promise';
import config from './../config/configuration';
import Twit from 'twit';

interface ITwitterRequestToken {
  oauth_token: string;
  oauth_token_secret: string;
  oauth_callback_confirmed: boolean | string;
}

export const getRequestToken = async (callbackUrl: string): Promise<ITwitterRequestToken> => {
  let response = await request.post({
    url: 'https://api.twitter.com/oauth/request_token',
    oauth: {
      callback: callbackUrl,
      consumer_key: config.twitter.consumerApiKey,
      consumer_secret: config.twitter.consumerSecret,
    },
  });

  response = parseResponse(response);
  return {
    ...response,
    oauth_callback_confirmed: response.oauth_callback_confirmed === 'true',
  };
};

interface ITwitterUserAuth {
  oauth_token: string;
  oauth_token_secret: string;
  user_id: string;
}

export const getUserAuthTokens = async (
  oauthToken: string,
  oauthVerifier: string,
): Promise<ITwitterUserAuth> => {
  const response = await request.post({
    url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
    oauth: {
      consumer_key: 'KEY',
      consumer_secret: 'SECRET',
      token: oauthToken,
    },
    form: { oauth_verifier: oauthVerifier },
  });

  return parseResponse(response);
};

export interface ITwitterUser {
  id: number;
  id_str: string;
  screen_name: string;
  profile_image_url: string;
  location: string | null;
  time_zone: string;
  verified: boolean;
  name: string;
  email: string | null;
}

export const verifyCredentials = async (
  accessToken: string,
  accessSecret: string,
): Promise<ITwitterUser> => {
  const twit = new Twit({
    consumer_key: config.twitter.consumerApiKey || '',
    consumer_secret: config.twitter.consumerSecret || '',
    access_token: accessToken,
    access_token_secret: accessSecret,
    timeout_ms: 60 * 1000,
    strictSSL: false,     // optional - requires SSL certificates to be valid.
  });
  const user: any = await twit.get('account/verify_credentials', { skip_status: true, include_email: true });
  return user.data as ITwitterUser;
};

const parseResponse = (str: string) => {
  const bodyString = '{ "' + str.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
  return JSON.parse(bodyString);
};

export const getProfileByScreenName = async (str: string): Promise<ITwitterUser> => {
  const twit = new Twit({
    consumer_key: config.twitter.consumerApiKey || '',
    consumer_secret: config.twitter.consumerSecret || '',
    app_only_auth: true,
  });

  const profiles: any = await twit.get('https://api.twitter.com/1.1/users/lookup.json', {screen_name: str});
  return profiles.data[0] as ITwitterUser;
};
