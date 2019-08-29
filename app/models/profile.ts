'use strict';

import { Model } from 'objection';

export interface IProfile {
  id?: number;
  userId?: number;
  bio?: string;
  website?: string;
  locale?: string;
  countryId?: number;
  regionId?: number;
  postcode?: string;
  createdAt?: string;
  progress?: number;
}

export default class Profile extends Model implements IProfile {
  public id?: number;
  public userId: number;
  public bio?: string;
  public website?: string;
  public locale?: string;
  public countryId?: number;
  public regionId?: number;
  public postcode?: string;
  public createdAt?: string;
  public progress?: number;

  static get tableName() {
    return 'Profile';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'userId',
      ],
      properties: {
        id: { type: 'number' },
        userId: { type: 'number' },
        bio: { type: 'string' },
        website: { type: 'string' },
        locale: { type: 'string' },
        countryId: { type: 'number' },
        regionId: { type: 'number' },
        postcode: { type: 'string' },
        createdAt: { type: 'timestamp' },
        progress: { type: 'number' },
      },
    };
  }

  static get relationMappings() {
    return {
      profile: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'Profile.userId',
          to: 'User.id',
        },
      },
    };
  }

}
