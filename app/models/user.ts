'use strict';

import { Model } from 'objection';
import * as bcrypt from 'bcrypt-nodejs';

export interface IUser {
  id?: number;
  name?: string;
  email?: string | null;
  username?: string;
  password?: string;
  avatar?: string;
  verified?: boolean;
  suspended?: boolean;
  twitterHandle?: string | null;
  twitterId?: string | null;
  twitterVerified?: boolean;
  passwordReset?: string | null;
  passwordResetTimeout?: string | null;
  isTwitterAccount?: boolean;
  timeZone?: string | null;
  createdAt?: string;
}

export default class User extends Model implements IUser {
  public id?: number;
  public name?: string;
  public email?: string;
  public username?: string;
  public password?: string;
  public avatar?: string;
  public verified?: boolean;
  public suspended?: boolean;
  public twitterHandle?: string | null;
  public twitterId?: string | null;
  public twitterVerified?: boolean;
  public isTwitterAccount?: boolean;
  public passwordReset?: string | null;
  public passwordResetTimeout?: string | null;
  public timeZone?: string | null;
  public createdAt?: string;

  static get tableName() {
    return 'User';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
        avatar: { type: 'string' },
        verified: { type: 'boolean' },
        suspended: { type: 'boolean' },
        twitterHandle: { type: ['string', 'null'] },
        twitterId: { type: ['string', 'null'] },
        twitterVerified: { type: 'boolean' },
        isTwitterAccount: { type: 'boolean' },
        passwordReset: { type: ['string', 'null'] },
        passwordResetTimeout: { type: ['string', 'null'] },
        timeZone: { type: ['string', 'null'] },
        createdAt: { type: 'timestamp' },
      },
    };
  }

  public async $beforeInsert() {
    if (this.password) {
      this.password = await generateHash(this.password);
    }
  }

  public async $beforeUpdate() {
    if (this.password) {
      this.password = await generateHash(this.password);
    }
    if (this.passwordReset) {
      this.passwordReset = await generateHash(this.passwordReset);
    }
  }

  static get relationMappings() {
    return {
      profile: {
        relation: Model.HasOneRelation,
        modelClass: __dirname + '/profile',
        filter: (query: any) =>
          query.select(['bio', 'website', 'progress', 'locale', 'countryId', 'regionId', 'postcode']),
        join: {
          from: 'User.id',
          to: 'Profile.userId',
        },
      },
    };
  }

}

const generateHash = (password: string): Promise<string> => (
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, () => null, (err2: Error, hash: string) => {
        if (err2) {
          reject(err2);
        }
        resolve(hash);
      });
    });
  })
);
