import { isEmpty } from 'lodash';
import * as jwt from 'jsonwebtoken';
import * as mailer from '../helpers/sparkpost';
import * as Router from 'koa-router';
import config from './../config/configuration';

import S3 from './../helpers/s3';
import { IUser } from './../models/user';
import { ITwitterUser } from './../services/twitter.api';

import {
  UserService,
  UserTempService,
  ProfileProgress,
  TwitterService,
} from '../services';

import {
  throwError,
  handleValidationError,
  throwValidationError,
} from './../helpers/errorHandlers';

export const checkForUsername = async (ctx: Router.IRouterContext) => {
  const {
    username,
  } = ctx.params;

  const userExists = await UserService.checkForUsername(username);

  ctx.body = { isAvailable: !userExists };
};

export const create = async (ctx: Router.IRouterContext) => {

  const {
    username,
    password,
    repeatedPassword,
  } = ctx.request.body;

  const {
    tempUserId,
  } = ctx.request.query;

  if (!tempUserId) {
    throwError('must include tempUserId', 400);
  }

  if (!username) {
    throwValidationError({ field: 'username' });
  }

  const userExists = await UserService.checkForUsername(username);

  if (userExists) {
    throwError('a user with this username already exists, please try another', 409);
  }

  if (!password) {
    throwValidationError({ field: 'password' });
  }

  if (!repeatedPassword) {
    throwValidationError({ field: 'repeatedPassword' });
  }

  if (password !== repeatedPassword) {
    throwError('passwords must match');
  }

  checkPasswordStrength(password);

  try {
    const userTemp = await UserTempService.getById(tempUserId);

    if (!userTemp) {
      throwError('temporary user not found', 404);
      return;
    }

    const user = await UserService.create({
      email: userTemp.email, name: userTemp.name, password, username, timeZone: userTemp.timeZone});

    if (!user || !user.id) {
      throwError('user not succefully saved', 400);
      return;
    }

    await UserTempService.remove(tempUserId);

    const token = jwt.sign({
      type: 'user',
      id: user.id,
    }, config.token.secret);

    ctx.body = {
      user: await ProfileProgress(user.id),
      token,
    };
    ctx.status = 201;
  } catch (err) {
    handleValidationError(ctx, err);
  }

};

export const get = async (ctx: Router.IRouterContext) => {
  const { expand } = ctx.request.query;
  const expanded = expand ? expand.split(',') : [];

  try {
    ctx.body = await UserService.get(ctx.params.userId, expanded);
    if (!ctx.body) {
      ctx.status = 404;
    }
  } catch (err) {
    handleValidationError(ctx, err);
  }
};

export const getByIds = async (ctx: Router.IRouterContext) => {
  const { expand } = ctx.request.query;
  const expanded = expand ? expand.split(',') : [];

  try {
    ctx.body = await UserService.getByIds(ctx.params.ids.split(','), expanded);
    if (!ctx.body) {
      ctx.status = 404;
    }
  } catch (err) {
    handleValidationError(ctx, err);
  }
};

export const update = async (ctx: Router.IRouterContext) => {
  const body = ctx.request.body;
  const userId = ctx.params.userId;
  delete body.suspended;
  delete body.createdAt;
  delete body.email;
  delete body.verified;

  const user = await UserService.get(userId);

  if (!user) {
    throwError('not found', 404);
  }

  if (isEmpty(body)) {
    ctx.body = user;
    return;
  }
  try {
    await UserService.update(userId, body);
    ctx.body = await ProfileProgress(userId);
  } catch (err) {
    handleValidationError(ctx, err);
  }
};

export const search = async (ctx: Router.IRouterContext) => {
  const { qty, from, searchTerm, expand } = ctx.request.query;
  const expanded = expand ? expand.split(',') : [];

  const promises: [Promise<IUser[]>, Promise<number>] = [
    UserService.search(searchTerm, qty, from, expanded),
    UserService.count(searchTerm),
  ];

  try {
    const [ data, count ] = await Promise.all(promises);

    ctx.body = {
      qty: (Number(qty) || 10),
      from: (Number(from) || 0),
      count,
      data,
    };
  } catch (err) {
    handleValidationError(ctx, err);
  }
};

export const suspend = async (ctx: Router.IRouterContext) => {
  try {
    ctx.body = await UserService.suspend(ctx.params.userId);
    if (!ctx.body) {
      ctx.status = 404;
    }
  } catch (err) {
    handleValidationError(ctx, err);
  }
};

export const login = async (ctx: Router.IRouterContext) => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    throwError('must include username and password');
  }

  try {

    const user = await UserService.checkCredentials(null, username, password);

    if (!user || user === 'timedout') {
      throwError('not authorized', 401);
      return;
    }

    const token = jwt.sign({
      type: 'user',
      id: user.id,
    }, config.token.secret);

    ctx.body = {
      user,
      token,
    };

  } catch (err) {
    handleValidationError(ctx, err);
  }
};

export const changePassword = async (ctx: Router.IRouterContext) => {
  const { userId } = ctx.params;
  const { oldPassword, newPassword, newPasswordRepeat } = ctx.request.body;

  if (newPassword !== newPasswordRepeat) {
    throwError('passwords must match');
  }

  checkPasswordStrength(newPassword);

  try {

    const correctCredentials = await UserService.checkCredentials(userId, null, oldPassword);

    if (!correctCredentials) {
      throwError('incorrect password', 400);
      return;
    }

    await UserService.changePassword(userId, newPassword);

    ctx.body = { status: 'done' };

  } catch (err) {
    handleValidationError(ctx, err);
  }

};

export const requestPasswordReset = async (ctx: Router.IRouterContext) => {
  const { email } = ctx.request.body;
  try {

    const user = await UserService.getByEmail(email);

    if (!user || !user.id) {
      ctx.body = { status: 'done' };
      return;
    }

    const password = generateRandomString(9);

    await UserService.setResetPassword(user.id, password);

    // TODO: send an email with resetPassword in.
    if (process.env.NODE_ENV !== 'integrationtest') {
      await mailer.send(
        email,
        'reset-password',
        { password },
      );
    }

    const token = jwt.sign({
      type: 'password-reset',
      id: user.id,
    }, config.token.secret);

    ctx.body = { status: 'done', token };

  } catch (err) {
    handleValidationError(ctx, err);
  }
};

export const changePasswordFromTemp = async (ctx: Router.IRouterContext) => {
  const { userId } = ctx.params;
  const { tempPassword, newPassword, newPasswordRepeat } = ctx.request.body;

  if (newPassword !== newPasswordRepeat) {
    throwError('passwords must match');
  }

  checkPasswordStrength(newPassword);

  try {

    const correctCredentials = await UserService.checkCredentials(userId, null, tempPassword);

    if (!correctCredentials) {
      throwError('incorrect temporary password', 401);
      return;
    }

    if (correctCredentials === 'timedout') {
      throwError('your temporary password has expired, please try resetting your password again.', 401);
      return;
    }

    await UserService.changePassword(userId, newPassword);

    const token = jwt.sign({
      type: 'user',
      id: correctCredentials.id,
    }, config.token.secret);

    ctx.body = {
      user: correctCredentials,
      token,
    };

  } catch (err) {
    handleValidationError(ctx, err);
  }

};

export const getPreSignedAvatarUrl = async (ctx: Router.IRouterContext) => {
  const { userId } = ctx.params;
  const { mimeType } = ctx.request.query;

  if (!mimeType) {
    throwError('must include mimeType in query');
  }

  const mimeSplit = mimeType.split('/');
  const fileType = mimeSplit[mimeSplit.length - 1];

  try {

    const filename = `avatar-${userId}-${generateRandomString(5)}.${fileType}`;

    const signedUrl = S3.getSignedUrl('putObject', {
      Bucket: config.aws.s3.bucket.avatar,
      Key: filename,
      Expires: config.aws.s3.urlExpires,
      ContentType: mimeType,
    });

    ctx.body = {
      signedUrl,
      avatarUrl: `https://s3.${config.aws.region}.amazonaws.com/${config.aws.s3.bucket.avatar}/${filename}`,
    };

  } catch (err) {
    handleValidationError(ctx, err);
  }
};

export const twitterUnlinkProfile = async (ctx: Router.IRouterContext) => {
  const {
    userId,
  } = ctx.params;

  const user = await UserService.get(userId);

  if (!user || !user.id) {
    throwError('user not found', 404);
    return;
  }

  await UserService.update(user.id, {
    twitterVerified: null,
    twitterHandle: null,
  });

  ctx.body = await ProfileProgress(userId);
};

export const twitterLinkProfile = async (ctx: Router.IRouterContext) => {
  const {
    oauthToken,
    oauthVerifier,
  } = ctx.request.body;

  const {
    userId,
  } = ctx.params;

  if (!oauthToken) {
    throwError('oauthToken must be included in payload');
  }

  if (!oauthVerifier) {
    throwError('oauthVerifier must be included in payload');
  }

  try {
    const user = await UserService.get(userId);

    if (!user) {
      throwError('user not found', 404);
      return;
    }

    if (user.twitterId) {
      throwError('already linked to a twitter account');
    }

    const twitterOauthUser = await TwitterService.getUserAuthTokens(oauthToken, oauthVerifier);
    // tslint:disable-next-line:max-line-length
    const twitterUser = await TwitterService.verifyCredentials(twitterOauthUser.oauth_token, twitterOauthUser.oauth_token_secret);

    if (!user || !user.id) {
      throwError('user not found', 404);
      return;
    }

    if (!twitterUser) {
      throwError('twitter user not found', 404);
      return;
    }

    await UserService.update(user.id, {
      twitterVerified: twitterUser.verified,
      twitterHandle: twitterUser.screen_name,
      twitterId: twitterUser.id_str,
    });

    ctx.body = await ProfileProgress(userId);

    ctx.status = 200;
    return;
  } catch (err) {
    handleValidationError(ctx, err);
  }
};

export const getTwitterProfileByScreenName = async (ctx: Router.IRouterContext) => {
  const { screen_name } = ctx.request.query;

  if (!screen_name) {
    throwError('not found', 404);
  }

  const profile: ITwitterUser = await TwitterService.getProfileByScreenName(screen_name);

  if (!profile) {
    throwError('not found', 404);
  }

  if (profile.profile_image_url) {
    profile.profile_image_url = profile.profile_image_url.replace('_normal', '');
  }

  ctx.body = profile;
};

const checkPasswordStrength = (password: string) => {
  if (password.length <= 7) {
    throwError('password must be greater than 7 characters');
  }

  if (!/[0-9]/.test(password)) {
    throwError('password must contain at least one number');
  }

  if (!/[A-Z]/.test(password)) {
    throwError('password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    throwError('password must contain at least one lowercase letter');
  }
};

const generateRandomString = (l: number) => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,";

  for (let i = 0; i < l; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};
