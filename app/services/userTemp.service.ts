import UserTemp, { IUserTemp } from './../models/userTemp';
// import * as moment from 'moment';
import moment from 'moment';
/*==============================================================================
  PUBLIC
==============================================================================*/

export const create = async (data: IUserTemp): Promise<IUserTemp> => {
  const userTemp = await UserTemp.query().where({email: data.email}).first();

  if (userTemp && userTemp.id) {
    return UserTemp.query()
      .pick(['email', 'id', 'timeZone', 'createdAt', 'name'])
      .patchAndFetchById(userTemp.id, {
        ...data,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
  }

  return UserTemp.query()
    .pick(['email', 'id', 'timeZone', 'createdAt', 'name'])
    .insertAndFetch(data);
};

export const get = async (email: string, verifyNumber: number | string): Promise<IUserTemp | undefined> => (
  UserTemp.query()
    .select('email', 'id', 'timeZone', 'createdAt', 'name')
    .where({email, verifyNumber: Number(verifyNumber)})
    .first()
);

export const getById = async (id: string | number): Promise<IUserTemp | undefined> => (
  UserTemp.query()
    .select('email', 'id', 'timeZone', 'createdAt', 'name')
    .where({id: Number(id)})
    .first()
);

export const verify = async (email: string): Promise<number | undefined> => (
  UserTemp.query().where({email}).patch({verified: true})
);

export const isVerified = async (email: string): Promise<IUserTemp | undefined> => (
  UserTemp.query()
    .select('email', 'id', 'timeZone', 'createdAt', 'name')
    .where({email, verified: true})
    .first()
);

export const remove = async (id: number): Promise<number | IUserTemp[]> => (
  UserTemp.query().where({id}).del()
);
