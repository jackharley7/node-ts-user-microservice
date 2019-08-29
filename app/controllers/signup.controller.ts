import * as Router from 'koa-router';
import {
  UserService,
  UserTempService,
  TwitterService,
} from '../services';

import * as mailer from '../helpers/sparkpost';
import moment from 'moment-timezone';
import * as jwt from 'jsonwebtoken';
import config from './../config/configuration';

import {
  handleValidationError,
  checkForValidationErrors,
  throwValidationError,
  throwError,
} from './../helpers/errorHandlers';
import { IUser } from '../models/user';

export const create = async (ctx: Router.IRouterContext) => {

  const { email, name, timeZone } = ctx.request.body;

  checkForValidationErrors({email, name, timeZone});

  try {

    const existingUser = await UserService.getByEmail(email);
    if (existingUser) {
      throwError('user already exists', 409);
    }

    const verifiedEmail = await UserTempService.isVerified(email);

    if (verifiedEmail) {
      const token = jwt.sign({
        type: 'temp',
        id: verifiedEmail.id,
      }, config.token.tempUserSecret);
      ctx.body = {
        user: verifiedEmail,
        token,
      };
      ctx.status = 200;
      return;
    }

    const user = {
      email,
      name,
      timeZone,
      verifyNumber: Math.floor(100000 + Math.random() * 900000),
    };

    const userTemp = await UserTempService.create(user);

    if (process.env.NODE_ENV !== 'integrationtest') {
      await mailer.send(
        email,
        'verification',
        { number: user.verifyNumber },
      );
    }

    ctx.body = {
      user: userTemp,
      token: null,
    };
    ctx.status = 201;
  } catch (err) {
    handleValidationError(ctx, err);
  }
};

export const verify = async (ctx: Router.IRouterContext) => {
  const {
    email,
    verifyNumber,
  } = ctx.request.body;

  if (!email) {
    throwValidationError({ field: 'email' });
  }

  if (!verifyNumber) {
    throwValidationError({ field: 'verifyNumber' });
  }

  try {

    const userTemp = await UserTempService.get(email, verifyNumber);

    if (!userTemp || !userTemp.id) {
      throwError('The verification code you entered is incorrect', 422);
      return;
    }

    if (!userTemp.timeZone) {
      userTemp.timeZone = moment.tz.guess();
    }

    const createdAt = moment(userTemp.createdAt).tz(userTemp.timeZone);

    const thirtyMinutesAgo = moment().tz(userTemp.timeZone).subtract(30, 'minutes');

    if (createdAt.isBefore(thirtyMinutesAgo)) {
      throwError('The verification code you entered has expired', 422);
      return;
    }

    await UserTempService.verify(userTemp.email);

    const token = jwt.sign({
      type: 'temp',
      id: userTemp.id,
    }, config.token.tempUserSecret);

    ctx.body = {
      user: {
        ...userTemp,
        verfied: true,
      },
      token,
    };
    ctx.status = 200;
  } catch (err) {
    handleValidationError(ctx, err);
  }

};

export const getTwitterRequestToken = async (ctx: Router.IRouterContext) => {
  const {
    callbackUrl,
  } = ctx.request.query;
  try {
    const tokens = await TwitterService.getRequestToken(callbackUrl);
    if (!tokens.oauth_callback_confirmed || tokens.oauth_callback_confirmed === 'false') {
      throwError('auth0 callback not confirmed', 400);
    }
    ctx.body = tokens;
  } catch (err) {
    handleValidationError(ctx, err);
  }
};

export const twitterSignup = async (ctx: Router.IRouterContext) => {
  const {
    oauthToken,
    oauthVerifier,
    timeZone,
  } = ctx.request.body;

  if (!oauthToken) {
    throwError('oauthToken must be included in payload');
  }

  if (!oauthVerifier) {
    throwError('oauthVerifier must be included in payload');
  }

  try {
    const twitterOauthUser = await TwitterService.getUserAuthTokens(oauthToken, oauthVerifier);
    // tslint:disable-next-line:max-line-length
    const twitterUser = await TwitterService.verifyCredentials(twitterOauthUser.oauth_token, twitterOauthUser.oauth_token_secret);
    const user = await UserService.getByTwitterId(twitterOauthUser.user_id);

    // login
    const userUpdates: IUser = {
      twitterVerified: twitterUser.verified,
      twitterHandle: twitterUser.screen_name,
      twitterId: twitterUser.id_str || twitterUser.id.toString(),
    };
    if (user && user.id) {
      await UserService.update(user.id, {
        twitterVerified: twitterUser.verified,
        twitterHandle: twitterUser.screen_name,
        twitterId: twitterUser.id_str || twitterUser.id.toString(),
      });
      const userToken = jwt.sign({
        type: 'user',
        id: user.id,
      }, config.token.secret);
      ctx.body = {
        user,
        token: userToken,
      };
      ctx.status = 201;
      return;
    }

    if (twitterUser.email) {
      const userWithSameEmail = await UserService.getByEmail(twitterUser.email);

      if (userWithSameEmail && userWithSameEmail.id) {
        await UserService.update(userWithSameEmail.id, {
          twitterVerified: twitterUser.verified,
          twitterHandle: twitterUser.screen_name,
          twitterId: twitterUser.id_str || twitterUser.id.toString(),
        });
        const emailUserToken = jwt.sign({
          type: 'user',
          id: userWithSameEmail.id,
        }, config.token.secret);
        ctx.body = {
          user: userWithSameEmail,
          token: emailUserToken,
        };
        ctx.status = 201;
        return;
      }
    }

    // create
      // get full user object from twitter

    const userObj: IUser = {
      twitterId: twitterUser.id_str,
      twitterHandle: twitterUser.screen_name,
      twitterVerified: twitterUser.verified,
      isTwitterAccount: true,
      email: twitterUser.email,
      timeZone,
    };

    if (twitterUser.name) {
      userObj.name = twitterUser.name;
    } else {
      userObj.name = twitterUser.screen_name;
    }

    const createdUser = await UserService.create(userObj);

    const token = jwt.sign({
      type: 'user',
      id: createdUser.id,
    }, config.token.secret);
    ctx.body = {
      user: createdUser,
      token,
    };
    ctx.status = 201;

  } catch (err) {
    handleValidationError(ctx, err);
  }
};
