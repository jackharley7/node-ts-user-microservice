import User, { IUser } from './../models/user';
import Profile from './../models/profile';
import * as bcrypt from 'bcrypt-nodejs';
import moment from 'moment';

/*==============================================================================
  PUBLIC
==============================================================================*/

export const checkForUsername = async (username: string) => {
  const user = await User.query()
    .select(['username'])
    .where({username})
    .first();

  return user ? true : false;
};

export const create = async (data: any): Promise<IUser> => {
  const user = await User.query()
    .pick(['id', 'email', 'name'])
    .insertAndFetch(data);

  await Profile.query().insert({userId: user.id});

  return user;
};

export const get = async (id: number, expanded?: string[]) => {
  const baseQuery = User.query()
    .where({id, suspended: 0})
    .select('name', 'id', 'avatar', 'email', 'twitterHandle', 'timeZone', 'isTwitterAccount')
    .first();

  if (expanded && expanded.includes('profile')) {
    baseQuery.eager('profile');
  }

  return baseQuery;
};

export const getByEmail = async (email: string) => (
  User.query()
  .where({email, suspended: 0})
  .select('name', 'id', 'avatar', 'email')
  .first()
);

export const getByUsername = async (username: string) => (
  User.query()
  .where({username, suspended: 0})
  .select('name', 'id', 'avatar', 'email')
  .first()
);

export const getByTwitterId = async (twitterId: string) => (
  User.query()
  .where({
    twitterId,
    suspended: 0,
  })
  .select('name', 'id', 'avatar', 'email')
  .first()
);

export const getByTwitterScreenName = async (screenname: string): Promise<IUser | undefined> => (
  User.query()
  .where({
    twitterHandle: screenname,
    suspended: 0,
  })
  .select( 'id', 'name', 'username', 'avatar', 'twitterHandle', 'twitterVerified', 'timeZone')
  .first()
);

export const getByIds = async (ids: number[], expanded: string[]) => {
  const baseQuery = User.query()
    .whereIn('id', ids)
    .select('id', 'name', 'username', 'avatar', 'twitterHandle', 'twitterVerified', 'timeZone');

  if (expanded && expanded.includes('profile')) {
    baseQuery.eager('profile');
  }

  return baseQuery;
};

export const search = async (
  str: string,
  qty: number = 10,
  from: number = 0,
  expanded: string[],
) => {
  const baseQuery = User.query()
    .where('name', 'like', `%${str}%`)
    .andWhere('suspended', 0)
    .select('name', 'id', 'avatar', 'twitterVerified', 'twitterHandle')
    .orderBy('name')
    .limit(Number(qty))
    .offset(Number(from));

  if (expanded && expanded.includes('profile')) {
    baseQuery.eager('profile');
  }

  return baseQuery;
};

export const count =  async (
  str?: string,
): Promise<number> => {
  let countRes: any = {};
  if (str) {
    countRes = await User.query()
                .where('name', 'like', `%${str}%`)
                .andWhere('suspended', 0)
                .count('* as rows')
                .first();
  } else {
    countRes = await User.query()
                .where('suspended', 0)
                .count('* as rows')
                .first();
  }

  return countRes.rows;
};

export const update = async (id: number, data: any) => (
  User.query()
    .pick(['name', 'id', 'avatar'])
    .patchAndFetchById(id, data)
);

export const suspend = async (id: number) => (
  User.query()
    .select('name', 'id', 'avatar', 'suspended')
    .patchAndFetchById(id, {suspended: true})
);

export const checkCredentials = async (
  id: number | null,
  username: string | null,
  password: string,
) => {

  const baseQuery = User.query()
    .where({suspended: 0})
    .select('name', 'id', 'avatar', 'password', 'passwordReset', 'passwordResetTimeout', 'timeZone')
    .first();

  if (id) {
    baseQuery.where({id});
  } else if (username && await isEmail(username)) {
    baseQuery.where({email: username});
  } else {
    baseQuery.where({username});
  }

  const user = await baseQuery;

  if (!user) {
    return false;
  }

  let correctCredentials = await checkPassword(password, user.password);

  if (!correctCredentials) {
    correctCredentials = await checkPassword(password, user.passwordReset);
    if (correctCredentials && user.passwordResetTimeout) {
      const timeout = moment(user.passwordResetTimeout).tz(user.timeZone || '');
      const now = moment().tz(user.timeZone || '');
      const hasNotTimedOut = now.isBefore(timeout);
      if (!hasNotTimedOut) {
        return 'timedout';
      }
    }
  }

  delete user.password;
  delete user.passwordReset;
  delete user.passwordResetTimeout;

  return correctCredentials ? user : false;

};

export const changePassword = async (
  userId: number,
  password: string,
) => (
  User.query()
    .select('name', 'id', 'avatar')
    .patchAndFetchById(userId, {password})
);

export const setResetPassword = async (
  userId: number,
  passwordReset: string,
) => (
  User.query()
    .select('name', 'id', 'avatar')
    .patchAndFetchById(userId, {
      passwordReset,
      passwordResetTimeout: moment().add(30, 'minutes').toISOString(),
    })
);

const checkPassword = async (
  password: string,
  hash: string | null | undefined,
) => {
  if (!password || !hash) {
    return false;
  }
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err: any, res: boolean) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

const isEmail = async (str: string) => {
  // tslint:disable-next-line:max-line-length
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(str).toLowerCase());
};
