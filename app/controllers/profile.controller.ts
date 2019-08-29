import * as Router from 'koa-router';

import {
  UserService,
  ProfileService,
  ProfileProgress,
} from '../services';

import {
  throwError,
  handleValidationError,
} from './../helpers/errorHandlers';

export const update = async (ctx: Router.IRouterContext) => {

  const body = ctx.request.body;
  const userId = ctx.params.userId;

  const user = await UserService.get(userId);

  if (!user) {
    throwError('not found', 404);
  }

  try {
    await ProfileService.update(userId, body);
    ctx.body = await ProfileProgress(userId);
  } catch (err) {
    handleValidationError(ctx, err);
  }
};
